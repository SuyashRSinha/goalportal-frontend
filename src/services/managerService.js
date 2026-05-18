import api from "./api";

export const getEmployeeGoals = async (email) => {
    return await api.get(`/goals/${email}`);
} ;

export const approveGoal = async (id) => {
    return await api.put(`/goals/approve/${id}`);
} ;

export const rejectGoal = async (id) => {
    return await api.put(`/goals/reject/${id}`);
}

export const reworkGoal = async (id, comment) => {
    return await api.put(`/goals/rework/${id}`, { managerComment:   comment });
} ;
