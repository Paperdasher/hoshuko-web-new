import * as React from 'react';

function WriteMinutesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Write Meeting Minutes</h1>
      <textarea
        placeholder="Minutes content..."
        className="w-full h-60 p-4 border rounded-lg focus:outline-none focus:ring"
      ></textarea>
      <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
        Save Minutes
      </button>
    </div>
  );
}

export default WriteMinutesPage;
