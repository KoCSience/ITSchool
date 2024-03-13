import { createRouter, createWebHistory } from "vue-router";
import CurrentStudent from "@/views/CurrentStudent/CurrentStudent.vue";
import ParentsPage from "@/views/Parents/ParentsPage.vue";
import IntroducePage from "@/views/Introduce/IntroducePage.vue";

const routes = [
  {
    path: "/CurrentStudent", //adresse en navigateur
    name: "CurrentStudent", //nom de routeur
    component: CurrentStudent, //composant lié au roureur

    children: [
      {
        path: "Announce",
        name: "Announce",
        component: () => import("@/views/CurrentStudent/AnnounceView.vue"),
      },
      {
        path: "Login",
        name: "Login",
        component: () => import("@/views/CurrentStudent/ToLogin.vue"),
      },
      {
        path: "Schedule",
        name: "Schedule",
        component: () => import("@/views/CurrentStudent/ClassSchedule.vue"),
      },
      {
        path: "Event",
        name: "Event",
        component: () => import("@/views/CurrentStudent/EventPage.vue"),
      },
      {
        path: "Map",
        name: "Map",
        component: () => import("@/views/CurrentStudent/MapView.vue"),
      },
      {
        path: "Question",
        name: "Question",
        component: () => import("@/views/CurrentStudent/AnyQuestion.vue"),
      },
    ],
  },
  {
    path: "/Parents",
    name: "Parents",
    component: ParentsPage,
    children: [
      {
        path: "Scholarship",
        name: "Scholarship",
        component: () => import("@/views/Parents/ScholarshipPage.vue"),
      },
      {
        path: "Dormitory",
        name: "Dormitory",
        component: () => import("@/views/Parents/DormitoryPage.vue"),
      },
    ],
  },
  {
    path: "/Introduce",
    name: "Introduce",
    component: IntroducePage,
    children: [
      {
        path: "Events",
        name: "Events",
        component: () => import("@/views/Introduce/EventsPage.vue"),
      },
      {
        path: "Facility",
        name: "Facility",
        component: () => import("@/views/Introduce/FacilityPage.vue"),
      },
      {
        path: "Capacity",
        name: "Capacity",
        component: () => import("@/views/Introduce/CapacityPage.vue"),
      },
      {
        path: "Access",
        name: "Access",
        component: () => import("@/views/Introduce/AccessPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
