import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [state, setState] = useState("");
    const [priority, setPriority] = useState(0);
    const [id, setId] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [datePicker, setDatePicker] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/to-dos").then(res => {
            setTodos(res.data.todos);
        });

    }, []);

    const deleteTodo = id => {
        axios.delete(`http://localhost:3000/to-dos/${id}`).then(res => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    };

    const setEdit = todo => {
        setId(todo.id);
        setTitle(todo.title);
        setDescription(todo.description);
        setPriority(todo.priority);
        setIsEditing(true);
        setState(todo.state);
    };

    const clearEdit = () => {
        setTitle("");
        setDescription("");
        setPriority(0);
        setIsEditing(false);
    };

    const verifyIsEmpty = () => {
        if (title === "" || description === "") {
            return true;
        } else {
            return false;
        }
    };
    const editTodo = (id, title, description, priority, state) => {
        axios.patch(`http://localhost:3000/to-dos/${id}`, {
            title,
            description,
            priority,
            state
        }).then(res => {
            getTodos();
            clearEdit();
        });
    };

    const addTodo = (title, description, priority) => {
        if (verifyIsEmpty()) {
            alert("Please fill all fields");
        } else {
            axios.post("http://localhost:3000/to-dos", {
                title,
                description,
                priority
            }).then(res => {
                getTodos();
                clearEdit();
            });
        }
    };

    const getTodos = () => {
        axios.get("http://localhost:3000/to-dos").then(res => {
            setTodos(res.data.todos);
        });
    };

    const updateTodo = (todo) => {
        let title = todo.title;
        let description = todo.description;
        let priority = todo.priority;
        let id = todo.id;
        axios.patch(`http://localhost:3000/to-dos/${id}`, {
            title,
            description,
            priority,
            state: !todo.state
        }).then(res => {
            getTodos();
            clearEdit();
        });
    };

    const OrderByPriority = () => {
        let todosCopy = [...todos];
        todosCopy.sort((a, b) => {
            return b.priority - a.priority;
        });
        setTodos(todosCopy);
    };

    const getByDate = (date) => {
        axios.get(`http://localhost:3000/to-dos/date/${date}`).then(res => {
            setTodos(res.data.todos);
        });
    }

    return (
        <motion className="flex flex-col space-y-4 min-w-screen h-screen animated fadeIn faster  left-0 top-0 mt-12 items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900">
            <div className="flex flex-col p-8 bg-stone-800 shadow-md hover:shodow-lg rounded-2xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Todo List
                    </h2>
                </div>
                <div className="flex flex-col space-y-4">
                    <input value={title} onChange={e => setTitle(e.target.value)} className="bg-stone-800 text-white outline-none focus:border-indigo-600 focus:placeholder:text-white focus:shadow-outline border-2 border-gray-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal transition-all duration-300 " type="text" placeholder="Title" />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="bg-stone-800 text-white outline-none focus:border-indigo-600 focus:placeholder:text-white focus:shadow-outline border-2 border-gray-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal transition-all duration-300 " type="text" placeholder="Desciption" />
                    <select value={priority} onChange={e => setPriority(e.target.value)} className="bg-stone-800 text-white outline-none focus:border-indigo-600 focus:placeholder:text-white focus:shadow-outline border-2 border-gray-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal transition-all duration-300 ">
                        <option disabled value={0}>Select Priority</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <motion.button
                        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                        onClick={() => {
                            isEditing ? editTodo(id, title, description, priority, state) : addTodo(title, description, priority)
                        }}
                        className={` ${isEditing ? "text-yellow-500 hover:bg-yellow-400" : "text-emerald-500 hover:bg-emerald-400"}  hover:text-white font-montserrat  py-2 px-8 font-medium rounded-xl transition-all duration-300`}>
                        {isEditing ? "EDIT" : "ADD"}
                    </motion.button>

                    {isEditing ? <button className="text-rose-600 hover:bg-rose-400 hover:text-white font-montserrat  py-2 px-8 font-medium rounded-xl transition-all duration-300" onClick={() => clearEdit()}>CANCEL</button> : null}
                </div>
            </div>

            <div className="flex items-center space-x-0 w-full lg:w-1/2 flex-col md:flex-row md:space-x-8">
                <h3 className="text-2xl font-bold text-white ">
                    filters:
                </h3>
                <button
                    onClick={() => { OrderByPriority() }}
                    className="text-emerald-500 hover:bg-emerald-400 hover:text-white font-montserrat my-2 py-2 px-8 font-medium rounded-xl transition-all duration-300 w-1/2">
                    Order by Priority
                </button>
                <input value={datePicker} onChange={e => { setDatePicker(e.target.value) }} type="date" className="bg-stone-800 text-white outline-none focus:border-indigo-600 focus:placeholder:text-white focus:shadow-outline border-2 border-gray-600 rounded-lg py-2 px-4 block w-full appearance-none leading-normal transition-all duration-300 " />
                <button
                    onClick={() => { getByDate(datePicker) }}
                    className="text-emerald-500 hover:bg-emerald-400 hover:text-white font-montserrat my-2 py-2 px-8 font-medium rounded-xl transition-all duration-300 w-1/2">
                    Get by Date
                </button>
            </div>

            <div className="grid grid-cols-1 mx-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
                {todos.map(todo => (
                    <motion.div animate={{ scale: 1 }} transition={{ duration: 0.3 }} initial={{ scale: 0.5 }} key={todo.id} className="flex flex-col space-y-4">
                        <div onDoubleClick={() => { updateTodo(todo) }} key={todo.id} className={`relative flex-grow p-4 space-x-2 justify-center ${todo.state ? "bg-emerald-700 hover:bg-emerald-600 hover:shadow-md hover:shadow-stone-400" : "bg-stone-800 hover:bg-stone-900 hover:shadow-md hover:shadow-stone-700"}  text-white rounded-lg outline-none focus:outline-none capitalize   transition-all duration-300 cursor-pointer`}>
                            <p className="text-xl font-semibold">{todo.title}</p>
                            <p className="text-sm mb-4">{todo.description}</p>
                            <p className="text-sm opacity-40">Created: {todo.dateCreated}</p>
                            
                            <p className={` ${todo.dateUpdated ? "" : "hidden"}  text-sm opacity-40`}>Updated: {todo.dateUpdated}</p>
                            <div className='has-tooltip'>
                                <span className='tooltip rounded shadow-lg p-1 absolute -top-3 -right-2 px-2 bg-stone-900 text-white-500 -mt-8'>Priority</span>
                                <p className="text-sm mb-4 absolute -top-2 -right-2 px-2 bg-green-400 rounded-full">{todo.priority}</p>
                            </div>

                            <button onClick={() => { setEdit(todo) }} className="text-yellow-600 hover:bg-yellow-400 hover:text-white font-montserrat py-2 px-8 font-medium rounded-xl transition-all duration-300 ">
                                <PencilIcon className="h-5 w-5 "></PencilIcon>

                            </button>
                            <button onClick={() => { deleteTodo(todo.id) }} className="text-rose-600 hover:bg-rose-400 hover:text-white font-montserrat py-2 px-8 font-medium rounded-xl transition-all duration-300 ">
                                <TrashIcon className="h-5 w-5 "></TrashIcon>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion>
    );
}


