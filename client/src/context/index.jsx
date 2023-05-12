import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children })=>{
    const { contract } = useContract('0x8f1Dc24D992EFaC8066f7cC9F29C2DdDD397AfCb');

    // to implement the write function of the smart contract
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    // to get address of the smart Wallet
    const address = useAddress();
    // to connect to the smart wallet
    const connect = useMetamask();

    // to create the campaign from the details that are filled in the form
    const publishCampaign = async (form) => {
        try {
            // the sequencing of the data should be same as how it is declared on createCampaign() function on web folder
            const data = await createCampaign([
                address, // owner
                form.title, // title
                form.description, // description
                form.target, // the target of the amount
                new Date(form.deadline).getTime(), // the time deadline
                form.image // the image to be uploaded

            ])
            console.log(`contract call success ${data}`);
        } catch (error) {
            console.log(`contract call failure ${error}`);
        }
    }

    const getCampaigns = async ()=>{
        const campaigns = await contract.call('getCampaigns');
        
        // to make data in readable format
        const parsedCampaigns = campaigns.map((campaign, index)=>({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                image: campaign.image,
                pId: index
        }));

        return parsedCampaigns;
    }

    const getUserCampaigns = async ()=>{
        const allCampaigns = await getCampaigns();

        const filterCampaigns = allCampaigns.filter(campaign => campaign.owner === address);

        return filterCampaigns;
    }

    const donate = async (pId, amount)=>{
        const data = await contract.call('donateToCampaign', pId, {
            value: ethers.utils.parseEther(amount)
        })

        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', pId);

        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),

            }) 
        }

        return parsedDonations;
    }

    // pass the above info to all the pages in the source folder
    return(
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations
            }}
        >
            { children }
        </StateContext.Provider>
    )
}

// creating a custom hook
export const useStateContext = () => useContext(StateContext);