import * as React from 'react';

function CreatePostPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create a New Post</h1>
      {/* Heading Input */}
      <input
        type="text"
        placeholder="Post Title"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring"
      />
      {/* Body Textarea */}
      <textarea
        placeholder="Post content..."
        className="w-full h-40 p-3 border rounded-lg focus:outline-none focus:ring"
      ></textarea>
      {/* Image Upload */}
      <input
        type="file"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {/* Submit Button */}
      <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
        Publish
      </button>
    </div>
  );
}

export default CreatePostPage;
