export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: 1,
    slug: 'ct-protocol-optimization',
    title: 'CT Protocol Optimization in the ED',
    description: 'A deep dive into optimizing computed tomography protocols for common emergency department presentations.',
    category: 'Essay',
    tags: ['CT', 'Trauma', 'Best Practices'],
    date: 'June 10, 2025',
    author: 'Dr. Evelyn Reed',
    content: `<p>Optimizing CT protocols is a critical task for any modern emergency department. It's a delicate balance between diagnostic yield, radiation dose, and workflow efficiency. In this essay, we will explore several key areas for improvement.</p><h3>Contrast Administration</h3><p>The timing and volume of intravenous contrast are paramount. We've found that weight-based dosing, coupled with bolus tracking, significantly improves the consistency of arterial and venous phase imaging, particularly in polytrauma patients.</p><h3>Low-Dose Techniques</h3><p>Iterative reconstruction algorithms have been a game-changer, allowing for substantial dose reduction without a significant loss in image quality. We'll discuss our institution's experience implementing ASiR-V on our scanners.</p>`,
  },
  {
    id: 2,
    slug: 'unseen-aortic-dissection',
    title: 'Hindsight: The Unseen Aortic Dissection',
    description: 'An analysis of a missed case of aortic dissection and the cognitive biases that played a role.',
    category: 'Hindsight',
    tags: ['Error Analysis', 'Aorta', 'Hindsight'],
    date: 'May 28, 2025',
    author: 'Dr. Ben Carter',
    content: `<p>Root cause analysis of diagnostic errors is crucial for improving patient safety. This case involves a 45-year-old male presenting with chest pain, whose initial chest CT was interpreted as negative for acute aortic pathology.</p><h3>Initial Presentation</h3><p>The patient's initial complaint was atypical, described as a sharp, intermittent pain radiating to the back. The initial read focused on ruling out pulmonary embolism, a classic example of "search satisficing" where the search is terminated after finding the first abnormality (or lack thereof).</p><h3>The Miss</h3><p>A subtle intimal flap in the ascending aorta was missed on the initial review. We will review the images and discuss the perceptual and cognitive factors that contributed to this oversight, including availability bias and premature closure.</p>`,
  },
  {
    id: 3,
    slug: 'ai-in-stroke-imaging',
    title: 'The Role of AI in Acute Stroke Imaging',
    description: 'Evaluating new AI-powered tools for large vessel occlusion detection and ASPECTS scoring.',
    category: 'Tool',
    tags: ['AI', 'Neuro', 'Tools'],
    date: 'May 15, 2025',
    author: 'Dr. Chloe Velez',
    content: `<p>Artificial intelligence is rapidly changing the landscape of neuroradiology, especially in the context of acute stroke. This post reviews three commercially available AI platforms for stroke imaging analysis.</p><h3>Large Vessel Occlusion (LVO) Detection</h3><p>We compared the sensitivity and specificity of AI-driven LVO alerts against the final interpretations of our neuroradiology faculty. The results are promising, with AI demonstrating high sensitivity for M1 and ICA terminus occlusions.</p><h3>Automated ASPECTS Scoring</h3><p>ASPECTS scoring can be subjective. AI tools provide a consistent, reproducible score, but do they agree with expert readers? We explore the nuances and potential pitfalls of relying on automated scoring systems.</p>`,
  },
  {
    id: 4,
    slug: 'acute-appendicitis-case',
    title: 'Case Study: Acute Appendicitis',
    description: 'A classic case of acute appendicitis on CT, with key imaging findings and differential diagnoses.',
    category: 'Case Study',
    tags: ['Abdomen', 'CT', 'Case Study'],
    date: 'June 01, 2025',
    author: 'Dr. Ben Carter',
    content: `<p>This is a classic case study of acute appendicitis. We will review the CT findings and discuss the clinical presentation and management.</p><h3>Imaging Findings</h3><p>The appendix is dilated, with wall thickening and surrounding fat stranding. An appendicolith is also present.</p>`,
  },
];
