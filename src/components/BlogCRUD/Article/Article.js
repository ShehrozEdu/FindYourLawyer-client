import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { BsThreeDots } from "react-icons/bs";

//components
import ArticleReuse from "./ArticleReuse";
import Error from "../../Error";
import Swal from "sweetalert2";
import axiosInstance from "../../Auth/AxiosInstance";

export default function Article() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();

  const getBlog = async () => {
    try {
      const response = await axiosInstance.get(
        `/all-blogs/${id}`
      );
      setBlog(response.data.blog);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getBlog();
  }, []);

  const updateBlog = async () => {
    try {
      const response = await axiosInstance.put(
        `/all-blogs/${id}`,
        {
          title,
          content,
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => setEditable(false));
      }
      getBlog();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (postId) => {
    try {
      const response = await axiosInstance.delete(
        `/all-blogs/${postId}`
      );
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog deleted Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/blogs");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex">
          {!editable ? (
            <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
              <h2 className="text-gray-900 font-medium title-font tracking-wider lg:text-3xl text-xl dark:text-white">
                {blog?.title}
              </h2>

              <span className="inline-block h-1 w-20 rounded bg-indigo-500 mt-8 mb-6"></span>
              <div className="leading-relaxed text-lg dark:text-white">{blog?.content}</div>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Update Blog Post
              </h2>

              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-semibold"
                >
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2"
                  placeholder="Enter your blog title"
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-gray-700 font-semibold"
                >
                  Content:
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="4"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2"
                  placeholder="Write your blog content here"
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-md transition duration-300"
                  onClick={updateBlog}
                >
                  Update Blog Post
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded shadow-md transition duration-300"
                  onClick={() => setEditable(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="cursor-pointer">
            <Popover placement="bottom">
              <PopoverHandler>
                <span>
                  <BsThreeDots />
                </span>
              </PopoverHandler>
              <PopoverContent>
                <div
                  onClick={() => setEditable(!editable)}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                >
                  Edit
                </div>
                <div
                  onClick={() => handleDelete(id)}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                >
                  Delete
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
      {/* <h1 className="text-3xl text-center mb-10 font-bold"> Other Articles</h1>
      <div className="flex flex-wrap">
        <ArticleReuse articles={}/>
        </div> */}
    </>
  );
}
