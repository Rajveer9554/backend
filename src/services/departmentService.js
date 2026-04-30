// detect department from user message

export const deartmentWmails ={
    "Nagar Nigam":"raj78606747@gmail.com",
    "Public Works Department": "pwd@lucknow.gov.in",
    "Water Supply Department": "water@lucknow.gov.in",
     "Municipal Corporation": "municipal@lucknow.gov.in"
};
export const detectDepartment =(message)=>
    {
    const text =message.toLowerCase();

    if (text.includes("sadak") || text.includes("road")){
        return "Nagar Nigam";
    }
    if (text.includes("traffic") || text.includes("jaam")){
        return "RTO";
    }
    if (text.includes("water") || text.includes("pani")){
        return "Nagar Nigam";
    }

    return "Muncipal Corporation";


}