import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_HELP_REQUESTS = gql`
  query {
    getAllHelpRequests {
      id
      author
      description
      location
      isResolved
      volunteers
      createdAt
      updatedAt
    }
  }
`;

const CREATE_HELP_REQUEST = gql`
  mutation CreateHelpRequest($description: String!, $location: String) {
    createHelpRequest(description: $description, location: $location) {
      id
      description
      location
      isResolved
    }
  }
`;

function HelpRequests() {
    const { loading, error, data } = useQuery(GET_HELP_REQUESTS);
    const [createHelpRequest, { loading: addingHelp }] = useMutation(CREATE_HELP_REQUEST, {
        refetchQueries: [GET_HELP_REQUESTS],
    });

    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        await createHelpRequest({ variables: { description, location } });
        setDescription('');
        setLocation('');
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white text-gray-900 rounded-xl shadow-md grid grid-cols-5 gap-6">
            {/* Left Column: Create Help Request */}
            <div className="col-span-2 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-2xl font-bold mb-4">Request Help</h2>
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                    <textarea className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your help request" value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    <input className="w-full p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        type="text" placeholder="Enter location (optional)" value={location}
                        onChange={(e) => setLocation(e.target.value)} />
                    <button className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        type="submit" disabled={addingHelp}>Submit Help Request</button>
                </form>
            </div>

            {/* Right Column: Help Requests */}
            <div className="col-span-3 bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Help Requests</h3>
                {loading ? <p>Loading...</p> : error ? <p className="text-red-500">Error fetching help requests</p> : (
                    <div className="space-y-4">
                        {data?.getAllHelpRequests.map(({ id, author, description, location, isResolved, volunteers, createdAt, updatedAt }) => (
                            <div key={id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                                <strong className="text-lg text-blue-600">{description}</strong>
                                <p className='mt-4'><strong>Author:</strong> {author}</p>
                                <p><strong>Location:</strong> {location || 'N/A'}</p>
                                <p><strong>Status:</strong> {isResolved ? 'Resolved' : 'Pending'}</p>
                                <p><strong>Volunteers:</strong> {volunteers.length > 0 ? volunteers.join(', ') : 'None'}</p>
                                <p>
                                    <strong>Created At:</strong>{" "}
                                    {createdAt ? new Date(createdAt).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    }) : "N/A"}
                                </p>
                                {updatedAt && <p className="text-sm text-gray-500"><strong>Updated At:</strong> {new Date(updatedAt).toLocaleString()}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HelpRequests;