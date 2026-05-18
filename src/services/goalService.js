import api from "./api";

export const createGoal = async (goalData) => {

    const response = await api.post("/goals/create", goalData);
    return response.data;
};

export const getGoals = async (email) => {
    const response = await api.get(`/goals/${email}`);
    return response.data;
};