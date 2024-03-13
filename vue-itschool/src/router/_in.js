import { createRouter, createWebHistory } from "vue-router";
import Exerceice1View from "@/views/Exercice1/Exerceice1View.vue";
import Exerceice2View from "@/views/Exercice2/Exerceice2View.vue";
import ParentsPage from "@/views/Parents/ParentsPage.vue";
import IntroducePage from "@/views/Introduce/IntroducePage.vue";

const routes = [
  {
    path: "/ex1", //adresse en navigateur
    name: "ex1", //nom de routeur
    component: Exerceice1View, //composant lié au roureur
  },
  {
    path: "/ex2",
    name: "ex2",
    component: Exerceice2View,
    children: [
      {
        path: "GroupeA",
        name: "GroupeA",
        component: () => import("@/views/Exercice2/GroupeA.vue"),
      },
      {
        path: "GroupeB",
        name: "GroupeB",
        component: () => import("@/views/Exercice2/GroupeB.vue"),
      },
      {
        path: "GroupeAB",
        name: "GroupeAB",
        component: () => import("@/views/Exercice2/GroupeAB.vue"),
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
