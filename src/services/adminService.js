import api from "./api";

export const createSharedGoal = async (payload) => {
    return await api.post("/goals/shared", payload);    
};

export const getSharedGoals = async () => {
    return await api.get("/goals/shared");
};
