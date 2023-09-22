import EmplDetails from "../../Model/empDetaisModel.js"
import Employee from "../../Model/employeeModel.js"

export const empStatus = async (req, res) => {
    Employee.hasMany(EmplDetails, { foreignKey: 'emp_id' });
    try {
    const lastStaus= await Employee.findAll({
        attributes: ['id', 'name', 'email', 'phone'],
        include: [
            {
                model: EmplDetails,
                attributes: ['jobsts'],
                order: [['id', 'DESC']], 
                limit: 1, 
            },
        ],
    })
        return res.status(200).json({ lastStaus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}