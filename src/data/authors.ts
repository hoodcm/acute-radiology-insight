
export interface Author {
  id: number;
  slug: string;
  name: string;
  title: string;
  bio: string;
}

export const authors: Author[] = [
  {
    id: 1,
    slug: 'evelyn-reed',
    name: 'Dr. Evelyn Reed',
    title: 'Chief of Emergency Radiology',
    bio: 'Dr. Evelyn Reed is a leading expert in trauma imaging and has published extensively on CT protocol optimization. She is passionate about education and mentorship, with over 15 years of experience in emergency radiology.',
  },
  {
    id: 2,
    slug: 'ben-carter',
    name: 'Dr. Ben Carter',
    title: 'Neuroradiology Fellow',
    bio: 'Dr. Ben Carter focuses on diagnostic error analysis and cognitive biases in radiology. His work aims to improve patient safety through systemic learning and has been featured in multiple peer-reviewed journals.',
  },
  {
    id: 3,
    slug: 'chloe-velez',
    name: 'Dr. Chloe Velez',
    title: 'Radiology Resident',
    bio: 'Dr. Chloe Velez has a keen interest in the intersection of artificial intelligence and medical imaging, particularly in the context of acute stroke care. She leads AI implementation initiatives at her institution.',
  },
];
