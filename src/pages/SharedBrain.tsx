import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/card";
import aiGlitter from "/home/nitiraj/brainly-fe/src/icons/ChatGPT Image Jun 25, 2025, 12_33_55 PM.png";
import chatGPTThumbnail from "/home/nitiraj/brainly-fe/src/icons/ChatGPT Image Jun 25, 2025, 01_37_03 PM.png";
import { Button } from "../components/Button";

export  function SharedBrain() {
  const { shareLink } = useParams();
  const [content, setContent] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/brain/${shareLink}`);
        setContent(res.data.content);
        setUsername(res.data.username);
      } catch (e) {
        console.error("Error loading shared content", e);
      }
    };

    fetchShared();
  }, [shareLink]);

  return (
    <div className="p-4 bg-gradient-to-r from-purple-100 via-purple-300/80 to-purple-400/70 h-screen"> 
    <div className="flex flex-cols justify-between">
      <div className="ml-4">
        <h1 className="text-2xl font-semibold mb-4 font-orbitron  bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 pl-2 bg-clip-text inline-block text-transparent  ">Brain Shared by {username}</h1>
        </div>
        <div className="mr-4">
          <Button
            variant="primary"
            text="Get Brainly"
            onClick={()=>{navigate("/")}}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-16 ml-20 mt-10">
      
        {content.reverse().map(({ _id, title, type, link }) => (
          <Card
          key={_id}
          contentId={_id}
          type={type}
          title={title}
          link={link}
          aiGlitter={aiGlitter}
          chatGPTThumbnail={chatGPTThumbnail}
          landing={false}
          shared={true}
          onDelete={()=>{alert("Deletion is not allowed on Shared Brain")}}
          />
        ))}
      </div>
    </div>
  );
}
