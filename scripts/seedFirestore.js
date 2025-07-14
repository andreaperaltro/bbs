// scripts/seedFirestore.js

const { initializeApp, getApps } = require('firebase/app');
const { getFirestore, collection, setDoc, doc, getDocs, deleteDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDohYHimO-EvkhMgBXM4lFhklGa14M8mpU",
  authDomain: "portfolio-bbs-c62f2.firebaseapp.com",
  projectId: "portfolio-bbs-c62f2",
  storageBucket: "portfolio-bbs-c62f2.firebasestorage.app",
  messagingSenderId: "983291858895",
  appId: "1:983291858895:web:624086165ec1188e6a0cba",
  measurementId: "G-RLXFB0N0WL"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

const sections = [
  {
    key: "A",
    label: "About",
    content: `My final goal is to convey thoughts and stories through different mediums and to raise the level of my creative developments with the constant research and study of new techniques for both client and personal projects. I am an avid observer of the world direction in terms of creativity, art and connections with a deep knowledge of the counterculture and the trends, might that be in design, music, movies, products and services. I believe that design is the ultimate representation of the understanding of human behaviours.`
  },
  {
    key: "T",
    label: "Techniques",
    content: `<strong>Graphic design:</strong> Adobe Creative Suite, Procreate<br/><strong>Digital design:</strong> Figma, Sketch<br/><strong>Generative:</strong> Processing, Java, Nodebox<br/><strong>3D Design:</strong> Cinema 4D, Blender`
  },
  {
    key: "S",
    label: "Skills",
    content: `Concept generation // Narrative strategy // Art direction // Typography // Illustration // Pattern design // Generative art // Digital design // User experience // 3D Design // Fashion product development`
  },
  {
    key: "C",
    label: "Clients",
    content: `<div class='flex flex-wrap gap-2 underline'><a href='https://www.oakley.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Oakley</a>, <a href='https://www.palaceskateboards.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Palace Skateboards</a>, <a href='https://www.ngg.net/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>NGG</a>, <a href='https://www.reebok.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Reebok</a>, <a href='https://www.polimoda.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Polimoda</a>, <a href='https://www.brionvega.it/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Brionvega</a>, <a href='https://www.fornasetti.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Fornasetti</a>, <a href='https://www.vivoconcerti.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Vivo Concerti</a>, <a href='https://www.canon.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Canon</a>, <a href='https://www.lonelyplanet.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Lonely Planet</a>, <a href='https://www.rittersport.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Ritter Sport</a>, <a href='https://www.zooppa.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Zooppa</a>, <a href='https://www.contraste.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Contraste</a></div>`
  },
  {
    key: "L",
    label: "Links",
    content: `<div class='flex flex-wrap gap-4 underline'><a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Instagram</a> <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>LinkedIn</a> <a href='https://github.com/' target='_blank' rel='noopener noreferrer' class='text-[#FFFF66]'>Github</a></div>`
  },
  {
    key: "D",
    label: "Lecturing",
    content: `<span class='text-[#FFFF66]'>Teaching Digital Design @ <a href='https://www.polimoda.com/' target='_blank' rel='noopener noreferrer' class='underline text-[#FFFF66]'>Polimoda, Florence</a></span>`
  },
  {
    key: "I",
    label: "Inspiration",
    content: `<a href='#' class='underline text-[#FFFF66]'>Interesting and inspiring links</a>`
  },
  {
    key: "M",
    label: "Schedule",
    content: `<span class='text-[#FFFF66]'>Schedule a meeting with me </span><a href='https://calendar.app.google/2HhMiVkUSuZTfMWz5' target='_blank' rel='noopener noreferrer' class='underline text-[#FFFF66]'>https://calendar.app.google/2HhMiVkUSuZTfMWz5</a>`
  },
  {
    key: "P",
    label: "Portfolio",
    content: "<span class='text-[#FFFF66]'>A selection of my work for clients and personal projects.</span>"
  }
];

const portfolioEntries = [
  {
    title: "Palace x Oakley",
    discipline: "Graphic design",
    client: "PALACE",
    clientUrl: "https://www.palaceskateboards.com/",
    description: "Graphic design t-shirt for the Palace X Oakley collab",
    images: [
      "https://via.placeholder.com/400x400?text=Palace+Oakley+1",
      "https://via.placeholder.com/400x400?text=Palace+Oakley+2",
      "https://via.placeholder.com/400x400?text=Palace+Oakley+3"
    ]
  }
];

async function seed() {
  // Delete all existing sections
  const sectionsSnap = await getDocs(collection(db, 'sections'));
  for (const docSnap of sectionsSnap.docs) {
    await deleteDoc(docSnap.ref);
    console.log(`Deleted old section: ${docSnap.id}`);
  }
  // Seed new sections
  for (const section of sections) {
    const ref = doc(collection(db, 'sections'), section.key);
    await setDoc(ref, section);
    console.log(`Seeded section: ${section.label}`);
  }
  for (const entry of portfolioEntries) {
    const ref = doc(collection(db, 'portfolio'));
    await setDoc(ref, entry);
    console.log(`Seeded portfolio entry: ${entry.title}`);
  }
  console.log('All sections and portfolio entries seeded!');
  process.exit(0);
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
}); 