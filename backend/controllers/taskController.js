const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  try {
    const io = req.app.get('socketio');
    // console.log("io", io)
    const task = new Task({ ...req.body, user: req.user._id });
    await task.save();
    // Emit the task creation event to all clients
    io.emit('taskCreated', task);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const {id} = req.params;
    const tasks = await Task.findOne({ user: req.user._id, _id:id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const io = req.app.get('socketio');
    // console.log("io", io)
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    io.emit('taskUpdated', task);  // Send event when a task is updated
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const io = req.app.get('socketio');
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    io.emit('taskDeleted', req.params.id);  // Emit deletion event
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.filterTaskByStatus = async (req, res) => {
  try {
    // console.log("req.query", req.query)
    const filterquery ={}
    filterquery.user= req.user._id ;

    const {status } = req.query;
    if(status){
      filterquery.status = status;
    }
    // console.log(filterquery)
    const tasks = await Task.find(filterquery);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};