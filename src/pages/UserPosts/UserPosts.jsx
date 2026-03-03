import React, { useEffect, useState, useContext } from "react";
import { Avatar, Card, CardBody, Tab, Tabs, Chip } from "@heroui/react";
import { FaRegBookmark, FaCamera } from "react-icons/fa"; 
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { MyProfile, HomeFeed } from "../../Services/PostServices";
import { uploadPhoto } from "../../Services/AuthServices"; 
import { AuthContext } from "../../components/context/AuthContext";
import Post from "../../components/Post/Post";

export default function ProfilePage() {
  const { setProfileData: setContextProfileData } = useContext(AuthContext); 
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [myPosts, setMyPosts] = useState([]);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false); 
  const [uploadingPhoto, setUploadingPhoto] = useState(false); 

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        const data = await MyProfile();
        if (!isMounted) return;
        const user = data.data.user;
        setProfileData(user);

        const postsData = await HomeFeed();
        if (!isMounted) return;
        const filtered = postsData.data.posts.filter(
          (post) => post.user._id === user._id,
        );
        setMyPosts(filtered);
      } catch (error) {
        if (error.response?.status === 429) {
          console.warn("Too many requests, retrying in 3 seconds...");
          setTimeout(fetchProfile, 3000);
        }
      }
    }

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);

 
  async function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    setUploadingPhoto(true);
    try {
      const response = await uploadPhoto(formData);
      const newPhoto = response.data.photo || response.data?.data?.user?.photo;
      setProfileData((prev) => ({ ...prev, photo: newPhoto }));
      setContextProfileData((prev) => ({ ...prev, photo: newPhoto })); 
    } catch (error) {
      console.error("Upload photo error:", error);
    } finally {
      setUploadingPhoto(false);
    }
  }

  const stats = [
    { label: "FOLLOWERS", value: profileData?.followersCount ?? 0 },
    { label: "FOLLOWING", value: profileData?.followingCount ?? 0 },
    { label: "BOOKMARKS", value: profileData?.bookmarksCount ?? 0 },
  ];

  return (
    <div className="bg-gray-200" style={{ minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto px-4 pt-5 pb-10">
        <div className="space-y-5">
          {/* Cover */}
          <div
            style={{
              height: "220px",
              width: "100%",
              borderRadius: "16px",
              background: profileData?.cover
                ? `url(${profileData.cover}) center/cover`
                : "linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 60%, #c8d8e8 100%)",
            }}
          />

          {/* Profile Card */}
          <Card
            style={{
              marginTop: "-60px",
              borderRadius: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              overflow: "visible",
            }}
          >
            <CardBody style={{ padding: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flex: 1,
                  }}
                >
                  {/* Profile Photo with Upload */}
                  <div
                    style={{
                      position: "relative",
                      width: "100px",
                      height: "100px",
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setIsHoveringPhoto(true)}
                    onMouseLeave={() => setIsHoveringPhoto(false)}
                    onClick={() =>
                      document.getElementById("photo-input").click()
                    }
                  >
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        border: "4px solid white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        background: "white",
                        overflow: "hidden",
                      }}
                    >
                      <Avatar
                        src={profileData?.photo}
                        name={profileData?.name}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>

                    
                    {(isHoveringPhoto || uploadingPhoto) && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: "rgba(0,0,0,0.45)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                           pointerEvents: "none",
                        }}
                      >
                        {uploadingPhoto ? (
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              border: "2px solid #fff",
                              borderTop: "2px solid transparent",
                              borderRadius: "50%",
                              animation: "spin 0.6s linear infinite",
                            }}
                          />
                        ) : (
                          <>
                            <FaCamera
                              style={{ color: "white", fontSize: "18px" }}
                            />
                            <span
                              style={{
                                color: "white",
                                fontSize: "10px",
                                fontWeight: 600,
                              }}
                            >
                              Change
                            </span>
                          </>
                        )}
                      </div>
                    )}

                   
                    <input
                      id="photo-input"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handlePhotoUpload}
                    />
                  </div>

                  <div>
                    <h2
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#1c1e21",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {profileData?.name}
                    </h2>
                    <p
                      style={{
                        color: "#65676b",
                        fontSize: "14px",
                        margin: "0 0 8px 0",
                      }}
                    >
                      @{profileData?.username}
                    </p>
                    <Chip
                      size="sm"
                      variant="flat"
                      color="primary"
                      startContent={<BsPeopleFill size={12} />}
                    >
                      Social App member
                    </Chip>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {stats.map((stat) => (
                    <Card
                      key={stat.label}
                      style={{
                        minWidth: "110px",
                        borderRadius: "12px",
                        border: "1px solid #e4e6ea",
                      }}
                      shadow="none"
                    >
                      <CardBody
                        style={{ padding: "16px", textAlign: "center" }}
                      >
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "#65676b",
                            letterSpacing: "0.8px",
                            margin: "0 0 6px 0",
                          }}
                        >
                          {stat.label}
                        </p>
                        <p
                          style={{
                            fontSize: "24px",
                            fontWeight: 800,
                            color: "#1c1e21",
                            margin: 0,
                          }}
                        >
                          {stat.value}
                        </p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Card
                  style={{
                    flex: 2,
                    minWidth: "260px",
                    borderRadius: "12px",
                    border: "1px solid #e4e6ea",
                  }}
                  shadow="none"
                >
                  <CardBody style={{ padding: "20px" }}>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#1c1e21",
                        marginBottom: "12px",
                      }}
                    >
                      About
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          color: "#65676b",
                          fontSize: "14px",
                        }}
                      >
                        <MdOutlineEmail size={18} />
                        <span>{profileData?.email}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          color: "#65676b",
                          fontSize: "14px",
                        }}
                      >
                        <BsPeopleFill size={16} />
                        <span>Active on Route Posts</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <div
                  style={{
                    flex: 1,
                    minWidth: "200px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <Card
                    style={{
                      borderRadius: "12px",
                      border: "1px solid #e4e6ea",
                    }}
                    shadow="none"
                  >
                    <CardBody style={{ padding: "16px 20px" }}>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#65676b",
                          letterSpacing: "0.8px",
                          margin: "0 0 6px 0",
                        }}
                      >
                        MY POSTS
                      </p>
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: 800,
                          color: "#1c1e21",
                          margin: 0,
                        }}
                      >
                        {myPosts.length}
                      </p>
                    </CardBody>
                  </Card>
                  <Card
                    style={{
                      borderRadius: "12px",
                      border: "1px solid #e4e6ea",
                    }}
                    shadow="none"
                  >
                    <CardBody style={{ padding: "16px 20px" }}>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#65676b",
                          letterSpacing: "0.8px",
                          margin: "0 0 6px 0",
                        }}
                      >
                        SAVED POSTS
                      </p>
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: 800,
                          color: "#1c1e21",
                          margin: 0,
                        }}
                      >
                        {profileData?.bookmarksCount ?? 0}
                      </p>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Tabs */}
          <Card
            style={{
              borderRadius: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <CardBody style={{ padding: "12px 16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Tabs
                  selectedKey={activeTab}
                  onSelectionChange={setActiveTab}
                  variant="light"
                  color="primary"
                >
                  <Tab
                    key="posts"
                    title={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <HiOutlineDocumentText size={16} /> My Posts
                      </div>
                    }
                  />
                  <Tab
                    key="saved"
                    title={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <FaRegBookmark size={14} /> Saved
                      </div>
                    }
                  />
                </Tabs>
                <Chip size="sm" color="primary" variant="flat">
                  {myPosts.length}
                </Chip>
              </div>
            </CardBody>
          </Card>

        
          <div>
            {activeTab === "posts" ? (
              myPosts.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {myPosts.map((post) => (
                    <Post key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <Card
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <CardBody style={{ padding: "24px" }}>
                    <p
                      style={{ color: "#65676b", fontSize: "14px", margin: 0 }}
                    >
                      You have not posted yet.
                    </p>
                  </CardBody>
                </Card>
              )
            ) : (
              <Card
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
              >
                <CardBody style={{ padding: "24px" }}>
                  <p style={{ color: "#65676b", fontSize: "14px", margin: 0 }}>
                    No saved posts yet.
                  </p>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
