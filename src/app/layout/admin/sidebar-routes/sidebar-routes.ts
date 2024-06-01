declare interface RouteInfo {
    path: any[];
    title: string;
    param: {};
    icon: string;
    class: string;
    children: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
    {
      path: ["/dashboard"],
      title: "Dashboard",
      icon: "ni-tv-2 text-primary",
      class: "",
      param: {},
      children: [],
    },
  
    {
      path: ["/user-profile"],
      title: "Profile",
      icon: "ni-single-02 text-yellow",
      class: "",
      param: {},
      children: [],
    },
    {
      path: ["/leaves", "new"],
      title: "Leave",
      icon: "fas fa-sign-out-alt text-pink",
      class: "",
      param: {},
      children: [
        {
          path: ["/leaves", "new"],
          title: "Leave Form",
          icon: "fas fa-sign-out-alt text-pink",
          class: "",
          param: {},
          children: []
        },
        {
          path: ["/cancel-leave-list", "Open"],
          title: "Leave Cancelation",
          icon: "fas fa-bus text-yellow",
          class: "",
          param: {},
          children: []
        },
      ]
    },
    {
      path: ["/travel", "new"],
      title: "Travel & Claim",
      icon: "fas fa-bus text-yellow",
      class: "",
      param: {},
      children: [
        {
          path: ["/travel", "new"],
          title: "Travel Form",
          icon: "fas fa-bus text-yellow",
          class: "",
          param: {},
          children: []
        },
        {
          path: ["/claim-list", "Open"],
          title: "Claim",
          icon: "fas fa-bus text-yellow",
          class: "",
          param: {},
          children: []
        },
      ]
    }
   
    
  
   
  ];