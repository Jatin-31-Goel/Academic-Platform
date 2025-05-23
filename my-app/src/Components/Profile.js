
// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import {
//   Container,
//   Box,
//   Typography,
//   Paper,
//   Avatar,
//   TextField,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   CircularProgress,
// } from "@mui/material"
// import { CloudUpload as CloudUploadIcon } from "@mui/icons-material"
// import { useAuth } from "../context/auth/AuthContext"

// const Profile = () => {
//   const navigate = useNavigate()
//   const { user } = useAuth()
//   const [loading, setLoading] = useState(false)
//   const [saving, setSaving] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState("")
//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     bio: "",
//     profile_picture: "",
//   })
//   const [stats, setStats] = useState({
//     uploads: 0,
//     comments: 0,
//     placements_added: 0,
//     placements_searches: 0,
//     interview_experiences_added: 0,
//     interview_experience_searches: 0,
//     dsa_searches: 0,
//     classrooms_created: [],
//     classrooms_joined: [],
//     recent_activity: [],
//   })
//   const [openDialog, setOpenDialog] = useState(false)
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

//   useEffect(() => {
//     fetchProfileData()
//   }, [])

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/user-stats", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         })
//         if (response.ok) {
//           const data = await response.json()
//           setStats(data)
//         } else {
//           console.error("Failed to fetch user stats")
//         }
//       } catch (error) {
//         console.error("Error fetching user stats:", error)
//       }
//     }

//     fetchStats()
//   }, [])

//   const fetchProfileData = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch("http://127.0.0.1:5000/profile", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       const data = await response.json()

//       if (response.ok) {
//         setProfileData(data)
//         setStats(
//           data.stats || {
//             uploads: 0,
//             comments: 0,
//             placements_added: 0,
//             placements_searches: 0,
//             interview_experiences_added: 0,
//             interview_experience_searches: 0,
//             dsa_searches: 0,
//             classrooms_created: [],
//             classrooms_joined: [],
//             recent_activity: [],
//           },
//         )
//       } else {
//         setError(data.message || "Failed to fetch profile data")
//       }
//     } catch (err) {
//       setError("Failed to fetch profile data")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setProfileData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//     setHasUnsavedChanges(true)
//   }

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     const formData = new FormData()
//     formData.append("file", file)

//     try {
//       setSaving(true)
//       const response = await fetch("http://127.0.0.1:5000/upload-profile-picture", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       })
//       const data = await response.json()

//       if (response.ok) {
//         setProfileData((prev) => ({
//           ...prev,
//           profile_picture: data.profile_picture,
//         }))
//         setSuccess("Profile picture updated successfully")
//         setHasUnsavedChanges(true)
//       } else {
//         setError(data.message || "Failed to upload profile picture")
//       }
//     } catch (err) {
//       setError("Failed to upload profile picture")
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleSave = async () => {
//     try {
//       setSaving(true)
//       const response = await fetch("http://127.0.0.1:5000/update-profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(profileData),
//       })
//       const data = await response.json()

//       if (response.ok) {
//         setSuccess("Profile updated successfully")
//         setHasUnsavedChanges(false)
//       } else {
//         setError(data.message || "Failed to update profile")
//       }
//     } catch (err) {
//       setError("Failed to update profile")
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleBack = () => {
//     if (hasUnsavedChanges) {
//       setOpenDialog(true)
//     } else {
//       navigate("/")
//     }
//   }

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <CircularProgress />
//       </Box>
//     )
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//           <Typography variant="h4" component="h1">
//             Profile
//           </Typography>
//           <Box>
//             <Button variant="outlined" onClick={handleBack} sx={{ mr: 2 }}>
//               Back
//             </Button>
//             <Button variant="contained" color="primary" onClick={handleSave} disabled={saving || !hasUnsavedChanges}>
//               {saving ? <CircularProgress size={24} /> : "Save Changes"}
//             </Button>
//           </Box>
//         </Box>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {error}
//           </Alert>
//         )}

//         {success && (
//           <Alert severity="success" sx={{ mb: 2 }}>
//             {success}
//           </Alert>
//         )}

//         <Grid container spacing={4}>
//           <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
//             <Box sx={{ position: "relative", display: "inline-block" }}>
//               <Avatar
//                 src={profileData.profile_picture}
//                 alt={profileData.username}
//                 sx={{ width: 150, height: 150, mb: 2 }}
//               />
//               <input
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 id="profile-picture-upload"
//                 type="file"
//                 onChange={handleImageUpload}
//               />
//               <label htmlFor="profile-picture-upload">
//                 <Button component="span" variant="outlined" startIcon={<CloudUploadIcon />} disabled={saving}>
//                   Upload Picture
//                 </Button>
//               </label>
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 label="Username"
//                 name="username"
//                 value={profileData.username}
//                 onChange={handleInputChange}
//                 disabled={saving}
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={profileData.email}
//                 onChange={handleInputChange}
//                 disabled={saving}
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 label="Bio"
//                 name="bio"
//                 multiline
//                 rows={4}
//                 value={profileData.bio}
//                 onChange={handleInputChange}
//                 disabled={saving}
//               />
//             </Box>
//           </Grid>
//         </Grid>

//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6" gutterBottom>
//             Statistics
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.uploads}</Typography>
//                 <Typography color="textSecondary">Total Uploads</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.comments}</Typography>
//                 <Typography color="textSecondary">Total Comments</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.placements_added}</Typography>
//                 <Typography color="textSecondary">Placements Added</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.placements_searches}</Typography>
//                 <Typography color="textSecondary">Placement Searches</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.interview_experiences_added}</Typography>
//                 <Typography color="textSecondary">Interview Experiences Added</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.interview_experience_searches}</Typography>
//                 <Typography color="textSecondary">Interview Experience Searches</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper sx={{ p: 2, textAlign: "center" }}>
//                 <Typography variant="h6">{stats.dsa_searches}</Typography>
//                 <Typography color="textSecondary">DSA Searches</Typography>
//               </Paper>
//             </Grid>
//           </Grid>

//           {stats.classrooms_created && stats.classrooms_created.length > 0 && (
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Classrooms Created
//               </Typography>
//               <List>
//                 {stats.classrooms_created.map((classroom) => (
//                   <ListItem key={classroom.id} divider>
//                     <ListItemText primary={classroom.name} secondary={`Classroom ID: ${classroom.id}`} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           )}

//           {stats.classrooms_joined && stats.classrooms_joined.length > 0 && (
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Classrooms Joined
//               </Typography>
//               <List>
//                 {stats.classrooms_joined.map((classroom) => (
//                   <ListItem key={classroom.id} divider>
//                     <ListItemText primary={classroom.name} secondary={`Classroom ID: ${classroom.id}`} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           )}

//           {stats.recent_activity && stats.recent_activity.length > 0 && (
//             <Box sx={{ mt: 3 }}>
//               <Typography variant="h6" gutterBottom>
//                 Recent Activity
//               </Typography>
//               <List>
//                 {stats.recent_activity.map((activity) => (
//                   <ListItem key={activity.id} divider>
//                     <ListItemText
//                       primary={activity.course_code}
//                       secondary={
//                         <>
//                           <Typography component="span" variant="body2">
//                             {activity.description}
//                           </Typography>
//                           <br />
//                           <Typography component="span" variant="caption" color="textSecondary">
//                             {new Date(activity.created_at).toLocaleDateString()} •{activity.upvotes} upvotes •{" "}
//                             {activity.downvotes} downvotes
//                           </Typography>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           )}
//         </Box>
//       </Paper>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Confirm Action</DialogTitle>
//         <DialogContent>
//           <Typography>You have unsaved changes. Are you sure you want to leave without saving?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button
//             onClick={() => {
//               setOpenDialog(false)
//               navigate("/")
//             }}
//             color="error"
//             variant="contained"
//           >
//             Leave
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   )
// }

// export default Profile


"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material"
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material"
import { useAuth } from "../context/auth/AuthContext"

const Profile = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    bio: "",
    profile_picture: "",
  })
  const [stats, setStats] = useState({
    uploads: 0,
    comments: 0,
    placements_added: 0,
    placements_searches: 0,
    interview_experiences_added: 0,
    interview_experience_searches: 0,
    dsa_searches: 0,
    classrooms_created: [],
    classrooms_joined: [],
    recent_activity: [],
  })
  const [openDialog, setOpenDialog] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    fetchProfileData()
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user-stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          console.error("Failed to fetch user stats")
        }
      } catch (error) {
        console.error("Error fetching user stats:", error)
      }
    }

    fetchStats()
  }, [])

  const fetchProfileData = async () => {
    try {
      setLoading(true)

      // Fetch profile data
      const profileResponse = await fetch("http://127.0.0.1:5000/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        console.log("Fetched profile data:", profileData)

        // Ensure no null values in the profile data
        setProfileData({
          username: profileData.username || "",
          email: profileData.email || "",
          bio: profileData.bio || "",
          profile_picture: profileData.profile_picture || "",
        })
      } else {
        const errorData = await profileResponse.json()
        setError(errorData.message || "Failed to fetch profile data")
      }

      // Fetch stats data
      const statsResponse = await fetch("http://127.0.0.1:5000/user-stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      } else {
        console.error("Failed to fetch user stats")
      }
    } catch (err) {
      console.error("Error fetching profile data:", err)
      setError("Failed to fetch profile data: " + (err.message || "Unknown error"))
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setHasUnsavedChanges(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      setSaving(true)
      setError("") // Clear any previous errors

      console.log("Uploading profile picture...")

      const response = await fetch("http://127.0.0.1:5000/upload-profile-picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })

      const data = await response.json()
      console.log("Upload response:", data)

      if (response.ok) {
        setProfileData((prev) => ({
          ...prev,
          profile_picture: data.profile_picture || prev.profile_picture,
        }))
        setSuccess("Profile picture updated successfully")

        // Force a refresh of the profile data
        setTimeout(() => {
          fetchProfileData()
        }, 500)
      } else {
        setError(data.message || "Failed to upload profile picture")
      }
    } catch (err) {
      console.error("Error uploading profile picture:", err)
      setError("Failed to upload profile picture: " + (err.message || "Unknown error"))
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch("http://127.0.0.1:5000/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileData),
      })
      const data = await response.json()

      if (response.ok) {
        setSuccess("Profile updated successfully")
        setHasUnsavedChanges(false)
      } else {
        setError(data.message || "Failed to update profile")
      }
    } catch (err) {
      setError("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setOpenDialog(true)
    } else {
      navigate("/")
    }
  }

  const refreshData = () => {
    fetchProfileData()
  }

  useEffect(() => {
    const handleFocus = () => {
      refreshData()
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography variant="h4" component="h1">
            Profile
          </Typography>
          <Box>
            <Button variant="outlined" onClick={handleBack} sx={{ mr: 2 }}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave} disabled={saving || !hasUnsavedChanges}>
              {saving ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                src={profileData.profile_picture || ""}
                alt={profileData.username || "User"}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-picture-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="profile-picture-upload">
                <Button component="span" variant="outlined" startIcon={<CloudUploadIcon />} disabled={saving}>
                  Upload Picture
                </Button>
              </label>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                disabled={saving}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={saving}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={profileData.bio}
                onChange={handleInputChange}
                disabled={saving}
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Statistics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.uploads}</Typography>
                <Typography color="textSecondary">Total Uploads</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.comments}</Typography>
                <Typography color="textSecondary">Total Comments</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.placements_added}</Typography>
                <Typography color="textSecondary">Placements Added</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.placements_searches}</Typography>
                <Typography color="textSecondary">Placement Searches</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.interview_experiences_added}</Typography>
                <Typography color="textSecondary">Interview Experiences Added</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.interview_experience_searches}</Typography>
                <Typography color="textSecondary">Interview Experience Searches</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">{stats.dsa_searches}</Typography>
                <Typography color="textSecondary">DSA Searches</Typography>
              </Paper>
            </Grid>
          </Grid>

          {stats.classrooms_created && stats.classrooms_created.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Classrooms Created
              </Typography>
              <List>
                {stats.classrooms_created.map((classroom) => (
                  <ListItem key={classroom.id} divider>
                    <ListItemText primary={classroom.name} secondary={`Classroom ID: ${classroom.id}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {stats.classrooms_joined && stats.classrooms_joined.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Classrooms Joined
              </Typography>
              <List>
                {stats.classrooms_joined.map((classroom) => (
                  <ListItem key={classroom.id} divider>
                    <ListItemText primary={classroom.name} secondary={`Classroom ID: ${classroom.id}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {stats.recent_activity && stats.recent_activity.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {stats.recent_activity.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemText
                      primary={activity.course_code}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {activity.description}
                          </Typography>
                          <br />
                          <Typography component="span" variant="caption" color="textSecondary">
                            {new Date(activity.created_at).toLocaleDateString()} •{activity.upvotes} upvotes •{" "}
                            {activity.downvotes} downvotes
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>You have unsaved changes. Are you sure you want to leave without saving?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setOpenDialog(false)
              navigate("/")
            }}
            color="error"
            variant="contained"
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Profile

