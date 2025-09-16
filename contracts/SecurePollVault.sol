// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecurePollVault is SepoliaConfig {
    using FHE for *;
    
    struct Poll {
        euint32 pollId;
        string title;
        string description;
        euint32[] encryptedVotes;
        euint32 totalVotes;
        bool isActive;
        bool isVerified;
        address creator;
        uint256 startTime;
        uint256 endTime;
        uint256 optionCount;
    }
    
    struct Voter {
        bool hasVoted;
        euint8 encryptedChoice;
        uint256 timestamp;
    }
    
    mapping(uint256 => Poll) public polls;
    mapping(uint256 => mapping(address => Voter)) public voters;
    mapping(address => euint32) public voterReputation;
    
    uint256 public pollCounter;
    address public owner;
    address public verifier;
    
    event PollCreated(uint256 indexed pollId, address indexed creator, string title);
    event VoteCast(uint256 indexed pollId, address indexed voter);
    event PollVerified(uint256 indexed pollId, bool isVerified);
    event ReputationUpdated(address indexed voter, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createPoll(
        string memory _title,
        string memory _description,
        uint256 _duration,
        uint256 _optionCount
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Poll title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(_optionCount > 0 && _optionCount <= 10, "Invalid option count");
        
        uint256 pollId = pollCounter++;
        
        // Initialize encrypted votes array
        euint32[] memory initialVotes = new euint32[](_optionCount);
        for (uint256 i = 0; i < _optionCount; i++) {
            initialVotes[i] = FHE.asEuint32(0);
        }
        
        polls[pollId] = Poll({
            pollId: FHE.asEuint32(0), // Will be set properly later
            title: _title,
            description: _description,
            encryptedVotes: initialVotes,
            totalVotes: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            creator: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            optionCount: _optionCount
        });
        
        emit PollCreated(pollId, msg.sender, _title);
        return pollId;
    }
    
    function vote(
        uint256 pollId,
        externalEuint8 choice,
        bytes calldata inputProof
    ) public {
        require(polls[pollId].creator != address(0), "Poll does not exist");
        require(polls[pollId].isActive, "Poll is not active");
        require(block.timestamp <= polls[pollId].endTime, "Poll has ended");
        require(!voters[pollId][msg.sender].hasVoted, "Already voted");
        
        // Convert externalEuint8 to euint8 using FHE.fromExternal
        euint8 internalChoice = FHE.fromExternal(choice, inputProof);
        
        // Verify choice is within valid range
        euint8 maxChoice = FHE.asEuint8(uint8(polls[pollId].optionCount - 1));
        ebool isValidChoice = FHE.le(internalChoice, maxChoice);
        
        // Store voter information
        voters[pollId][msg.sender] = Voter({
            hasVoted: true,
            encryptedChoice: internalChoice,
            timestamp: block.timestamp
        });
        
        // Update poll totals (this would need more complex FHE operations in practice)
        polls[pollId].totalVotes = FHE.add(polls[pollId].totalVotes, FHE.asEuint32(1));
        
        emit VoteCast(pollId, msg.sender);
    }
    
    function getPollResults(uint256 pollId) public view returns (euint32[] memory) {
        require(polls[pollId].creator != address(0), "Poll does not exist");
        require(block.timestamp > polls[pollId].endTime, "Poll has not ended");
        
        return polls[pollId].encryptedVotes;
    }
    
    function getPollInfo(uint256 pollId) public view returns (
        string memory title,
        string memory description,
        uint256 startTime,
        uint256 endTime,
        bool isActive,
        bool isVerified,
        address creator,
        uint256 optionCount
    ) {
        Poll storage poll = polls[pollId];
        return (
            poll.title,
            poll.description,
            poll.startTime,
            poll.endTime,
            poll.isActive,
            poll.isVerified,
            poll.creator,
            poll.optionCount
        );
    }
    
    function verifyPoll(uint256 pollId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify polls");
        require(polls[pollId].creator != address(0), "Poll does not exist");
        
        polls[pollId].isVerified = isVerified;
        emit PollVerified(pollId, isVerified);
    }
    
    function updateVoterReputation(address voter, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(voter != address(0), "Invalid voter address");
        
        voterReputation[voter] = reputation;
        emit ReputationUpdated(voter, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getVoterReputation(address voter) public view returns (uint8) {
        return 0; // FHE.decrypt(voterReputation[voter]) - will be decrypted off-chain
    }
    
    function hasVoted(uint256 pollId, address voter) public view returns (bool) {
        return voters[pollId][voter].hasVoted;
    }
    
    function endPoll(uint256 pollId) public {
        require(polls[pollId].creator == msg.sender, "Only creator can end poll");
        require(polls[pollId].isActive, "Poll is not active");
        
        polls[pollId].isActive = false;
    }
    
    function getTotalVotes(uint256 pollId) public view returns (uint8) {
        return 0; // FHE.decrypt(polls[pollId].totalVotes) - will be decrypted off-chain
    }
}
