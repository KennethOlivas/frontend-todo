import { render } from "@testing-library/react";
import React from "react";

export default function ImputsTodos() {
    render(
        <div class="flex flex-col space-y-4 min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900">
        <div class="flex flex-col p-8 bg-gray-800 shadow-md hover:shodow-lg rounded-2xl">
            <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white mb-4">
                Todo List
            </h2>
            <button class="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                Delete
            </button>
            </div>
            <div class="flex flex-col space-y-4">
            <div class="flex flex-col space-y-4">
                <input
                type="text"
                class="flex-grow p-2 bg-gray-700 text-white rounded-lg outline-none focus:outline-none"
                placeholder="Add a new todo"
                />
                <button class="flex-no-shrink bg-red-500 px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                Add
                </button>
            </div>
            </div>
        </div>
        </div>
    )
}