import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleReuse from "./ArticleReuse";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Swal from "sweetalert2";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [size, setSize] = React.useState(null);

  const handleOpenDialogue = (value) => setSize(value);
  const lawyerId = JSON.parse(localStorage.getItem("auth_token1"))?._id;
  const lawyerTrue = JSON.parse(localStorage.getItem("auth_token1"))?.isLawyer;

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://find-your-lawyer-server.vercel.app/api/all-blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const createBlog = async (e) => {
    e.preventDefault();
    const blogData = {
      title: title,
      content: content,
      lawyerId: lawyerId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs/create-blog",
        blogData
      );
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog creation Successful!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => handleOpenDialogue(null));
      }
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex dark:bg-gray-700">
      <main className="flex-1">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-4xl text-4xl font-bold title-font mb-2 text-gray-900 dark:text-white">
                  Legal Insights!
                </h1>
                <div className="h-1 w-72 bg-indigo-500 rounded"></div>
                {blogs.length > 0 && lawyerTrue? (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 mt-5 rounded shadow-md transition duration-300"
                    onClick={() => handleOpenDialogue("md")}
                  >
                    Start Writing Your Blog
                  </button>
                ) : null}
                <Dialog
                  open={size === "md"}
                  size={size || "md"}
                  handler={handleOpenDialogue}
                  className="dark:bg-gray-500"
                >
                  <DialogHeader>Create your Blog!</DialogHeader>
                  <DialogBody>
                    <div>
                      <form className="space-y-4">
                        <div>
                          <label
                            htmlFor="title"
                            className="block text-gray-700 font-semibold dark:text-white"
                          >
                            Title:
                          </label>
                          <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:text-white dark:bg-gray-700"
                            placeholder="Enter your blog title"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="content"
                            className="block text-gray-700 font-semibold dark:text-white"
                          >
                            Content:
                          </label>
                          <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="4"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:text-white dark:bg-gray-700"
                            placeholder="Write your blog content here"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </DialogBody>
                  <DialogFooter>
                    {
                      <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpenDialogue(null)}
                        className="mr-1"
                      >
                        <span>Cancel</span>
                      </Button>
                    }
                    <Button
                      variant="text"
                      color="green"
                      className="bg-[green] hover:bg-green-800 hover:text-white font-semibold py-3 px-6 rounded shadow-md transition duration-300"
                      onClick={createBlog}
                    >
                      <span>Publish Blog</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>
              <p className="lg:w-1/2 w-full leading-relaxed dark:text-white text-gray-500">
                Discover the <strong>finest blogs</strong> penned by our
                seasoned professionals in their respective fields of expertise!
                These insightful writings offer a wealth of{" "}
                <strong>knowledge and experience.</strong> <br />
                Each blog post is a testament to the dedication and &nbsp;
                <strong>proficiency of our professionals.</strong> They delve
                into the intricacies of their specializations, providing readers
                with a unique perspective. The content is not only informative
                but also engaging, making it a delightful read. <br /> Join us
                on this <strong>enlightening journey</strong> as we explore
                various topics, unraveling the mysteries and uncovering the
                truths of our professional world. Enjoy the read!
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              {blogs.length > 0 ? (
                <ArticleReuse articles={blogs} />
              ) : (
                <div className="flex flex-col justify-center items-center mx-auto">
                  <div className="h-1 w-72 bg-indigo-500 rounded"></div>
                  <p className="text-center w-full text-gray-500 dark:text-white mt-4">
                    No blogs are here yet.
                  </p>
                 {lawyerTrue&& <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 mt-5 rounded shadow-md transition duration-300"
                    onClick={() => handleOpenDialogue("md")}
                  >
                    Start Writing Your Blog
                  </button>}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
