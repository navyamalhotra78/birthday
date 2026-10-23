import letterText from "./letter.txt?raw";

export const content = {
  name: "Aaryan",
  age: "24",
  from: "Navya",
  tagline: "A limited edition, one reader only.",

  cover: {
    headline: "The Aaryan Issue",
    kicker: "Birthday Edition · Vol. 1",
    photo: "/assets/1.jpeg",
    teasers: [
      "6 Questions Making a Cutesy Quiz",
      "Awards that You've Won This Year",
      "A Perfect Letter (from me obv)",
    ],
  },

  timeline: [
    {
      date: "First date",
      title: "Mildly chaotic, mostly perfect",
      caption: "Finally after 3 years of dating (shame)",
      photo: "/assets/2.jpeg",
    },
    {
      date: "Babies' day out",
      title: "Us and our favourite hobby",
      caption: "Who can say no to ice cream? Not us.",
      photo: "/assets/3.jpeg",
    },
    {
      date: "First dinner date",
      title: "So much fun",
      caption: "And yes, I'll be wearing heels again. Prepare accordingly.",
      photo: "/assets/5.jpeg",
    },
    {
      date: "Movie dates",
      title: "The one constant",
      caption: "Never have we ever picked a good one. At least the company is 10/10.",
      photo: "/assets/4.jpeg",
    },
    {
      date: "Lately",
      title: "The best days are always with you <3",
      caption: "Coffee dates & our little escapades ☕",
      photo: "/assets/6.jpeg",
    },
  ],

  quiz: [
    {
      q: "We win a free trip tomorrow. Where are we going?",
      options: [
        { text: "A beach, no plans", reaction: "Sunset, sand, zero emails. Booking it." },
        { text: "Mountains and bad cell service", reaction: "Perfect. Nobody can reach us." },
        { text: "Anywhere with great food", reaction: "Spoken like a true man of culture." },
      ],
    },
    {
      q: "Who takes longer to get ready?",
      options: [
        { text: "Me", reaction: "Honest, but I know it's not true." },
        { text: "You", reaction: "Hmm. Let's say I plead the fifth." },
        { text: "We both lie about how long it takes", reaction: "This is the correct answer." },
      ],
    },
    {
      q: "Who said \"I love you\" first?",
      options: [
        { text: "Me", right: false, reaction: "Obviously 😌" },
        { text: "You", reaction: "Aww you wish" },
        { text: "We both said it at the same time", reaction: "Let's be real" },
      ],
    },
    {
      q: "What is your most-used phrase?",
      options: [
        { text: "Arey yawr", reaction: "I hear it in my sleep." },
        { text: "Aap sunte hi nahin ho", reaction: "Yes. Every single day." },
        { text: "Nahinnnnnnn", reaction: "Why are you always disagreeing yaar" },
      ],
    },
    {
      q: "How many near-identical photos do we take every time?",
      options: [
        { text: "3, tops", reaction: "Adorable. And completely wrong." },
        { text: "About 300", reaction: "Closer. Still modest." },
        { text: "Until one is perfect (it never is)", reaction: "The camera roll agrees." },
      ],
    },
    {
      q: "Complete the sentence: \"You're my favourite ___\"",
      options: [
        { text: "Person", right: true, reaction: "Right. And that's the whole point. 🥹" },
        { text: "Chaos", right: true, reaction: "Also right. A beautiful kind of chaos." },
        { text: "Reason to smile", right: true, reaction: "I'm not crying, you are." },
      ],
    },
    {
      q: "On a scale of 1 to 10, how much do I love you?",
      options: [
        { text: "10", right: true, reaction: "Solid. But you can go higher." },
        { text: "11", right: true, reaction: "Now we're getting closer." },
        { text: "Immeasurable", right: true, reaction: "Correct. The scale gave up." },
      ],
    },
    {
      q: "Last one. What does the birthday boy want today?",
      options: [
        { text: "Cake", right: true, reaction: "Granted. 🎂" },
        { text: "A very long nap", right: true, reaction: "Granted. After the cake." },
        { text: "Me, obviously", right: true, reaction: "Granted. All three. Check the end of the issue." },
      ],
    },
  ],

  awardsTitle: "The Awards of the Year",
  awards: [
    { title: "The Great French Fry Heist Award", note: "For someone who eats my fries despite having his own." },
    { title: "Best Supporting Role In My Life", note: "Lead role, actually.The rest of the cast is just here for decoration." },
    { title: "For Smiling in Photos Like I'm Holding You Hostage", note: "It's been eight years now, come on." },
    { title: "Lifetime Achievement in Hugs & Kisses", note: "Undefeated, supreme winner." },
  ],

  dreams: {
    eyebrow: "The next chapter",
    title: "Things We're Going To Do",
    sub: "A list I plan to keep long and running forever.",
    items: [
      { emoji: "✈️", text: "Finally take a trip together" },
      { emoji: "🌅", text: "Watch both the sunset and sunrise together" },
      { emoji: "🍜", text: "Try out all the new restaurants we've saved" },
      { emoji: "🎤", text: "Go to concert, have the best time and take a million blurry pictures" },
      { emoji: "🏔️", text: "A hike I'll complain about and you'll love" },
      { emoji: "🏡", text: "Keep finding new things to do together, even when we're old and boring." },
    ],
  },

  letter: {
    greeting: "Dear Aaryan,",
    body: letterText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    signoff: "Yours,",
  },

  gift: {
    label: "One more thing…",
    title: "Your gift is en route 🎁",
    text: "Although, technically, you've already received the best gift: me, the other one is on its way. Please allow time for shipping and my excellent gift-giving skills. ",
  },

  wrap: {
    headline: "Thank you for being my favourite plotline.",
  },
};
