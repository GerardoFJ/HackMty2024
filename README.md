# ATechM
Our inclusive ATM system uses facial, finger, and head gestures detection, plus voice control for users with disabilities. It also boosts security by identifying criminals through facial recognition.

## Inspiration

The inspiration behind **ATechM** comes from our desire to make banking services more accessible, particularly for individuals with physical disabilities. Recognizing the lack of inclusivity in current ATM designs, we aimed to create a system that not only breaks down barriers for people with mobility issues but also enhances security for all users.

## What it does

**ATechM** is a next-generation ATM system that uses advanced technology to deliver a seamless, touch-free, and secure experience. Key features include:

- **Facial recognition** for secure logins
- **Finger movement detection** using **MediaPipe** for touch-free navigation
- **Head tracking** to allow users to interact without touching the screen
- **Voice command** capabilities for hands-free operation
- **Luxand integration** to ensure only real faces are detected, preventing identity spoofing with photos
- Cross-referencing faces against **criminal databases** stored in **MongoDB** to deny access to flagged individuals

## How we built it

We built **ATechM** using a combination of powerful tools and frameworks:

- **Next.js** for a fast, scalable web-based infrastructure
- **MediaPipe** for real-time finger and face tracking, and criminal detection
- **Luxand** for ensuring real-face detection and preventing identity spoofing
- **MongoDB** to store criminal face data and user account information in a highly scalable and secure database

These technologies were integrated into a cohesive, responsive system that prioritizes both user accessibility and security.

## Challenges we ran into

We encountered several challenges along the way:

1. Ensuring the accuracy of facial recognition and preventing spoofing using **Luxand** required extensive testing.
2. Seamlessly integrating **MediaPipe** with **Next.js** to deliver real-time performance was technically demanding.
3. Managing and querying a large dataset of criminal faces in **MongoDB** while maintaining quick response times posed its own challenges.

## Accomplishments that we're proud of

We’re proud of several key accomplishments:

- Building an **inclusive system** that empowers users with disabilities.
- Successfully integrating **MediaPipe** for finger tracking and **Luxand** for face authentication.
- Implementing a secure, efficient **criminal detection feature** that leverages **MongoDB** to enhance user safety at ATMs.

## What we learned

Developing **ATechM** provided us with valuable lessons:

- **Balancing user experience and security** is crucial in creating inclusive technology.
- We learned how to integrate complex systems like **MediaPipe**, **Luxand**, and **MongoDB** within a web-based framework like **Next.js**.
- It’s essential to design solutions that are inclusive without compromising on **security** or **efficiency**.

## What's next for ATechM

We have several exciting plans for the future of **ATechM**:

- Expanding voice recognition to support **multilingual** users.
- Collaborating with **security agencies** to refine and enhance our criminal detection algorithms.
- Scaling **ATechM** to become the global standard for ATM systems, ensuring secure and inclusive banking for everyone.
