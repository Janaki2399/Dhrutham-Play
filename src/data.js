import { v4 } from "uuid";
export const allVideos = [
  {
    id: "ShZ978fBl6Y",
    name: "Calum Scott - You Are The Reason",
    isLiked:false
  },
  {
    id: "60ItHLz5WEA",
    name: "Alan Walker - Faded",
    isLiked:false
  },
  {
    id: "BKx_B1VZ2kw",
    name: "Ae Watan - Full Video | Raazi |",
    isLiked:false
  },
  {
    id:"BKx_B1VZ2kw",
    name: "Imagine Dragons - Believer (with lyrics)",
    isLiked:false
  },
  {
    id: "ALZHF5UqnU4",
    name: "Marshmello - Alone (Official Music Video)",
    category:"songs",
    isLiked:false
  },
  {
    id:"nSDgHBxUbVQ",
    name: "Ed Sheeran - Photograph (Official Music Video)",
    category:"songs",
    isLiked:false
  },
  {
    id:"fo_If5EpwZs",
    name: "How To Make A Crème Caramel | MasterChef Canada | MasterChef World",
    isLiked:false
  },
  {
    id:"_wIEVElP8Cw",
    name: "How To Make A Cheesecake | MasterChef Canada | MasterChef World",
    isLiked:false
  },
  {
    id:"DtfwHUiCLag",
    name: "The Pizza Challenge 🍕| MasterChef Canada | MasterChef World,",
    isLiked:false
  }  
];

export const categoryPlayListData=[
  {
    id:v4(),
    name:"songs",
    level:"beginner",
    list:[
      {
        videoId:"ShZ978fBl6Y"
      },
      {
        videoId:"60ItHLz5WEA"
      },
      {
        videoId:"BKx_B1VZ2kw"
      },
      {
        videoId:"ALZHF5UqnU4"
      },
      {
        videoId:"nSDgHBxUbVQ"
      }
    ]
  },{
    id:v4(),
    name:"cooking",
    level:"intermediate",
    list:[
      {
        videoId:"fo_If5EpwZs"
      },
      {
        videoId:"_wIEVElP8Cw"
      },
      {
        videoId:"DtfwHUiCLag"
      }
    ]
  }
]