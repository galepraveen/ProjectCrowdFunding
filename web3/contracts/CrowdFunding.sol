// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    // created a structure of the Campaign
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    // mapping of integer(campaignID) to each campaign
    mapping(uint256 => Campaign) public campaigns;

    // initialising the number of campaigns to zero
    uint256 public numberOfCampaigns = 0;

    /* FUNCTIONALITIES IN THE PLATFORM */

    // creating the campaing with the details of it which creates the campaign and returns the campaign id
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns(uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // checking if the conditon is satisfied
        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future");

        // initialising the campaign with the passed data
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        // incrementing the campaign for the new future campaign
        numberOfCampaigns += 1;

        // returning the index of the current campaign
        return numberOfCampaigns - 1;
    }

    // donating to particular campaign based on the id of the campaign
    function donateToCampaign(uint256 _id) public payable {
        // setting the required amount by the donator
        uint256 amount = msg.value;

        // fetching the current campaign with the campaign id
        Campaign storage campaign = campaigns[_id];

        // pushing the donators inforamtion and the donation amount
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        // checking if the transaction is successfully sent or not
        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent){
            campaign.amountCollected += amount;
        }
    }

    // fetching information about the donators and donations
    function getDonators(uint256 _id) view public returns(address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // fetching all the existing campaigns in the platform
    function getCampaigns() public view returns (Campaign[] memory){
        // creating the object allCampaigns with the numberOfCampaigns size of Campaign array so that all the campaigns can be viewed similar to [{},{},{},...]
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        // looping through the campaigns mapping and storing each campaign in the allCampaigns array
        for(uint i = 0; i < numberOfCampaigns; ++i){
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

}