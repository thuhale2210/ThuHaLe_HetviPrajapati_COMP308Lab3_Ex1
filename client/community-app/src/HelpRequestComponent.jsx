import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_HELP_REQUESTS = gql`
  query {
    getAllHelpRequests {
      id
      description
      location
      isResolved
    }
  }
`;

const CREATE_HELP_REQUEST = gql`
  mutation CreateHelpRequest($description: String!, $location: String) {
    createHelpRequest(description: $description, location: $location) {
      id
      description
      location
    }
  }
`;

function HelpRequestComponent() {
  const { loading, error, data, refetch } = useQuery(GET_HELP_REQUESTS);
  const [createHelpRequest] = useMutation(CREATE_HELP_REQUEST);
  const [newRequest, setNewRequest] = useState({ description: "", location: "" });

  const handleCreateHelpRequest = async () => {
    await createHelpRequest({ variables: newRequest });
    refetch();
    setNewRequest({ description: "", location: "" });
  };

  if (loading) return <p>Loading help requests...</p>;
  if (error) return <p>Error loading help requests!</p>;

  return (
    <div className="container">
      <h2>Help Requests</h2>
      <ul className="list-group">
        {data.getAllHelpRequests.map((req) => (
          <li key={req.id} className="list-group-item">
            <h4>{req.description}</h4>
            <p>Location: {req.location || "N/A"}</p>
            <p>Status: {req.isResolved ? "Resolved" : "Open"}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-4">Create a Help Request</h3>
      <input type="text" className="form-control mt-2" placeholder="Description"
        value={newRequest.description} onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })} />
      <input type="text" className="form-control mt-2" placeholder="Location"
        value={newRequest.location} onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })} />
      <button className="btn btn-primary mt-3" onClick={handleCreateHelpRequest}>Create Help Request</button>
    </div>
  );
}

export default HelpRequestComponent;
