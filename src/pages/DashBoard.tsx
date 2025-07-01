import { useEffect, useRef, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/plusIcon"
import { ShareIcon } from "../icons/shareIcon"
import { Sidebar } from "../components/sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios";
import { Logo2 } from "../icons/logo2"
import { SumModal } from "../components/SumModal"
import { Searchbar } from "../components/SearchBar"
import { useNavigate } from "react-router-dom"
import aiGlitter from "../icons/AIglitter.png";
import chatGPTThumbnail from "/home/nitiraj/brainly-fe/src/icons/ChatGPT Image Jun 25, 2025, 01_37_03 PM.png";








export function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, refresh, username } = useContent();
  const [summOpen, setSummOpen] = useState(false);
  const [open ,setOpen] = useState(false);
  const [refcontentId, refsetContentId] = useState<string | null>(null);
  let ref =  useRef<HTMLInputElement>(null);
  const [ytClick, setYtClick] = useState(false);
  const [twClick, setTwClick] = useState(false);
  const [docClick, setDocClick] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchRef, setSearchRef] = useState("");
  const [remove, setRemove] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (contentId: string) => {
    console.log("Deleting content:", contentId, "for user:", localStorage.getItem("userId"));
  
      try {
          await axios.post(
              "http://localhost:3000/api/v1/delete",
              { contentId },
              {
                  headers: {
                      Authorization: localStorage.getItem("authorization"),
                  },
              }
          );
          console.log("Delete successful");
          refresh();
      } catch (error: any) {
          console.error("Delete failed:", error.response?.data || error.message);
      }
  };

  return (
    <div className="flex">
    <div className="mt-30 "> 
      <Sidebar
            ytClick={ytClick} setYtClick={setYtClick}
            twClick={twClick} setTwClick={setTwClick}
            docClick={docClick} setDocClick={setDocClick}/>
    </div>

      <div className="flex-1 sm:ml-screen min-h-screen bg-gradient-to-r from-purple-100 via-purple-300/80 to-purple-400/70 text-gray-700 transition-all duration-300 pb-10">

        
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            refresh();
          }}
        />
        <SumModal
          open={summOpen}
          onClose={() => setSummOpen(false)}
          contentId={refcontentId || ""}
        />  
        
        <div className="z-50 
  flex flex-wrap justify-between items-center gap-4 mt-5
  p-2 sm:p-3 md:p-4 
  mx-4 sm:mx-2 md:mx-5 lg:mx-10 xl:mx-20 
  bg-white/10 
  border border-white/20 rounded-xl shadow-xl 
  transition-transform duration-300 hover:scale-105">
          
        <div className="flex items-center animate-float2 cursor-pointer"
          onClick={()=>{navigate('/DashBoard')}}
        >
          <Logo2 />
            <h1 className="text-2xl font-orbitron font-bold bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 pl-2 bg-clip-text inline-block text-transparent ">
            Welcome, {username || "User"}!
            </h1>
        </div>
        <div className="flex items-center mr-40">
          <Searchbar 
            onClick={() => {
              setSearch(!search);
              setSearchRef(ref?.current?.value || "");
              setRemove(!remove);
            }} 
            ref={ref} 
            remove={remove}
          />
            
        </div>
        <div className="flex gap-4 pt-4 mb-3">
          <Button
            onClick={() => {
              setModalOpen(true);
              console.log("open");
            }}
            variant="primary"
            text=""
            className="w-10 h-10"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={async () => {
            console.log("Share button clicked");
            try {
            const res = await axios.post(
            "http://localhost:3000/api/v1/brain/share",
            { share: true },
            {
            headers: {
              Authorization: localStorage.getItem("authorization"),
            },
            }
            );



            const link = res.data.link || res.data.hash;
            if (link) {
            const fullLink = `http://localhost:5173/brain/${link}`;
            await navigator.clipboard.writeText(fullLink);
            alert("Link copied to clipboard!");
            }
              } 
            catch (e) {
                console.error("Error sharing brain:", e);
              }
            }}
            variant="primary"
            text=""
            className="w-10 h-10"
            startIcon={<ShareIcon />}/>
        </div>

      </div>

        {!search && !ytClick && !twClick && !docClick && (
          <div className="flex gap-10 flex-wrap justify-center sm:justify-start px-4 ml-28 mt-8">
          {[...content].reverse().map(({ _id, type, title, link }) => (
           <Card
           key={_id}
           contentId={_id}
           type={type}
           title={title}
           link={link}
           landing={false}
           chatGPTThumbnail={chatGPTThumbnail}
           onDelete={handleDelete}
           aiGlitter={aiGlitter}
           shared={false}
           onSummarizeClick={() => {
            refsetContentId(_id);
            setSummOpen(true);
            }}
          />
            ))}
          </div>)}

        {!search && ytClick && (
          <div className="flex gap-10 flex-wrap justify-center sm:justify-start px-4 ml-28 mt-8">
            {[...content]
              .filter((item) => item.type === "youtube")
              .reverse()
              .map(({ _id, type, title, link }) => (
                <Card
                  key={_id}
                  contentId={_id}
                  type={type}
                  title={title}
                  link={link}
                  aiGlitter={aiGlitter}
                  landing={false}
                  shared={false}
                  onDelete={handleDelete}
                  onSummarizeClick={() => {
                    refsetContentId(_id);
                    setSummOpen(true);
                  }}
                />
              ))}
          </div>
        )}


        {!search && twClick && (
          <div className="flex gap-10 flex-wrap justify-center sm:justify-start px-4 ml-28 mt-8">
            {[...content]
              .filter((item) => item.type === "twitter")
              .reverse()
              .map(({ _id, type, title, link }) => (
                <Card
                  key={_id}
                  contentId={_id}
                  type={type}
                  title={title}
                  link={link}
                  landing={false}
                  aiGlitter={aiGlitter}
                  shared={false}
                  onDelete={handleDelete}
                  onSummarizeClick={() => {
                    refsetContentId(_id);
                    setSummOpen(true);
                  }}
                />
              ))}
          </div>
        )}  
        {!search && docClick && (
        <div className="flex gap-10 flex-wrap justify-center sm:justify-start px-4 ml-28 mt-8">
          {[...content]
            .filter((item) => item.type === "link")
            .reverse()
            .map(({ _id, type, title, link }) => (
            <Card
              key={_id}
              contentId={_id}
              type={type}
              title={title}
              link={link}
              landing={false}
              aiGlitter={aiGlitter}
              shared={false}
              chatGPTThumbnail={chatGPTThumbnail}
              onDelete={handleDelete}
              onSummarizeClick={() => {
                refsetContentId(_id);
                setSummOpen(true);
              }}
            />
          ))}
        </div>
          )}
          {search && (
          <div className="flex gap-10 flex-wrap justify-center sm:justify-start px-4 ml-28 mt-8">
            {[...content]
              .filter((item) => item.title.toLowerCase().includes(searchRef.toLowerCase()))
              .reverse()
              .map(({ _id, type, title, link }) => (
                <Card
                  key={_id}
                  contentId={_id}
                  type={type}
                  title={title}
                  link={link}
                  aiGlitter={aiGlitter}
                  landing={false}
                  shared={false}
                  onDelete={handleDelete}
                  onSummarizeClick={() => {
                    refsetContentId(_id);
                    setSummOpen(true);
                  }}
                />
              ))}
          </div>
        )}
        </div>
        </div>
    );
  }
