import { useEffect, useRef, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../svgs/plusIcon"
import { ShareIcon } from "../svgs/shareIcon"
import { Sidebar } from "../components/sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios";
import { Logo2 } from "../svgs/logo2"
import { SumModal } from "../components/SumModal"
import { Searchbar } from "../components/SearchBar"
import { useNavigate } from "react-router-dom"









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
  useEffect(() => {
    console.log("Fetched username:", username);
  }, [username]);
  const handleDelete = async (contentId: string) => {
    console.log("Deleting content:", contentId, "for user:", localStorage.getItem("userId"));
  
      try {
          await axios.post(
              "https://brainlybe.onrender.com/api/v1/delete",
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
  <div className="hidden md:block mt-30">
    <Sidebar
      ytClick={ytClick}
      setYtClick={setYtClick}
      twClick={twClick}
      setTwClick={setTwClick}
      docClick={docClick}
      setDocClick={setDocClick}
    />
  </div>

  <div className="flex-1 min-h-screen bg-gradient-to-r from-purple-100 via-purple-300/80 to-purple-400/70 text-gray-700 transition-all duration-300 pb-10">
    <CreateContentModal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        refresh();
      }}
    />
    <SumModal open={summOpen} onClose={() => setSummOpen(false)} contentId={refcontentId || ""} />

    <div className="z-50 flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center gap-4 mt-5 px-4 sm:px-6 lg:px-10 xl:px-20 py-3 ml-20 mr-20 bg-white/10 border border-white/20 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105">
      <div
        className="flex items-center gap-2 animate-float2 cursor-pointer"
        onClick={() => navigate('/DashBoard')}
      >
        <Logo2 />
        <h1 className="text-xl sm:text-3xl font-orbitron font-bold bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 pl-0 bg-clip-text text-transparent">
          Brainly
        </h1>
      </div>

      <div className="w-full sm:w-auto flex justify-center sm:justify-end">
        <Searchbar
          onClick={() => {
            setSearch(!search);
            setSearchRef(ref?.current?.value || '');
            setRemove(!remove);
          }}
          ref={ref}
          remove={remove}
        />
      </div>

      <div className="flex gap-4 pt-2">
        <Button
          onClick={() => {
            setModalOpen(true);
            console.log('open');
          }}
          variant="primary"
          text=""
          className="w-10 h-10"
          startIcon={<PlusIcon />}
        />
        <Button
          onClick={async () => {
            console.log('Share button clicked');
            try {
              const res = await axios.post(
                'https://brainlybe.onrender.com/api/v1/brain/share',
                { share: true },
                {
                  headers: {
                    Authorization: localStorage.getItem('authorization'),
                  },
                }
              );
              const link = res.data.link || res.data.hash;
              if (link) {
                const fullLink = `http://localhost:5173/brain/${link}`;
                await navigator.clipboard.writeText(fullLink);
                alert('Link copied to clipboard!');
              }
            } catch (e) {
              console.error('Error sharing brain:', e);
            }
          }}
          variant="primary"
          text=""
          className="w-10 h-10"
          startIcon={<ShareIcon />}
        />
      </div>
    </div>

    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-0 mt-20 ml-5 md:ml-48 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 ">
        {[...content]
          .filter((item) => {
            if (search) return item.title.toLowerCase().includes(searchRef.toLowerCase());
            if (ytClick) return item.type === 'youtube';
            if (twClick) return item.type === 'twitter';
            if (docClick) return item.type === 'link';
            return true;
          })
          .reverse()
          .map(({ _id, type, title, link }) => (
            <Card
              key={_id}
              contentId={_id}
              type={type}
              title={title}
              link={link}
              landing={false}
              shared={false}
              aiGlitter="/icons/AIglitter.png"
              chatGPTThumbnail="/icons/docs.png"
              onDelete={handleDelete}
              onSummarizeClick={() => {
                refsetContentId(_id);
                setSummOpen(true);
              }}
            />
          ))}
      </div>
    </div>
  </div>
</div>

    );
  }
