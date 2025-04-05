import { sendResponse } from "../../utils/sendResponse.js";
import Task from "../../model/task/task.model.js";

export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    return sendResponse(res, true, 201, "Task created successfully", savedTask);
  } catch (error) {
    return sendResponse(
      res,
      false,
      400,
      "Failed to create task",
      error.message
    );
  }
};

// export const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().populate("assignedTo", "name email");
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getAllTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      assignedTo,
      title,
      sortBy,
      sortOrder,
      page,
      limit,
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (title || assignedTo) {
      filter.$or = [];
      if (title) {
        filter.$or.push({ title: { $regex: title, $options: "i" } }); // Case-insensitive search for title
      }
      if (assignedTo) {
        filter.$or.push({ assignedTo }); // Match assignedTo directly
      }
    }

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalTasks = await Task.countDocuments(filter);

    return sendResponse(res, true, 200, "Tasks fetched successfully", {
      tasks,
      pagination: {
        totalTasks,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalTasks / pageSize),
      },
    });
  } catch (error) {
    return sendResponse(
      res,
      false,
      500,
      "Failed to fetch tasks",
      error.message
    );
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("assignedTo", "name email");
    if (!updatedTask) {
      return sendResponse(res, false, 404, "Task not found", null);
    }
    return sendResponse(
      res,
      true,
      200,
      "Task updated successfully",
      updatedTask
    );
  } catch (error) {
    return sendResponse(
      res,
      false,
      400,
      "Failed to update task",
      error.message
    );
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return sendResponse(res, false, 404, "Task not found", null);
    }
    return sendResponse(
      res,
      true,
      200,
      "Task deleted successfully",
      deletedTask
    );
  } catch (error) {
    return sendResponse(
      res,
      false,
      400,
      "Failed to delete task",
      error.message
    );
  }
};
