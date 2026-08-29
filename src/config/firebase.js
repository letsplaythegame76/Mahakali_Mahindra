
        import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
        import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, Timestamp, getDoc, setDoc, limit, arrayUnion, arrayRemove, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

        // Your Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCOMUADdZF9L7I4_-tlxekDXlQU50kShCs",
            authDomain: "crm-27a1e.firebaseapp.com",
            projectId: "crm-27a1e",
            storageBucket: "crm-27a1e.firebasestorage.app",
            messagingSenderId: "831749902968",
            appId: "1:831749902968:web:459fabd0da1798fcd0538d"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // Secondary, isolated Firebase app instance used ONLY for creating
        // new team-member logins (Team section). Firebase's client SDK
        // auto-signs-in as whichever user you just created, so creating a
        // login on the SAME auth instance the owner is logged into was
        // knocking the owner out of their session and forcing a full
        // dashboard reset. Using a completely separate app/auth instance
        // means creating a team login never touches the owner's session or
        // triggers the owner's onAuthStateChanged listener at all.
        const secondaryApp = initializeApp(firebaseConfig, "Secondary");
        const secondaryAuth = getAuth(secondaryApp);
        // Firestore instance bound to the SECONDARY app, used to write the
        // new team member's own "users/{uid}" document while THEY are the
        // authenticated user (request.auth.uid === uid). This matches your
        // existing Firestore rules (which allow a user to create their own
        // document) without requiring any rules changes.
        const secondaryDb = getFirestore(secondaryApp);

        // Enable offline persistence for faster subsequent loads
        enableIndexedDbPersistence(db).catch((err) => {
            if (err.code == 'failed-precondition') {
                console.log('Persistence failed - multiple tabs open');
            } else if (err.code == 'unimplemented') {
                console.log('Persistence not available');
            }
        });

        // Make Firebase available globally
        window.firebase = {
            app, auth, db,
            secondaryAuth, secondaryDb,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            signOut,
            onAuthStateChanged,
            sendPasswordResetEmail,
            collection, addDoc, getDocs, updateDoc, deleteDoc, doc,
            query, where, orderBy, serverTimestamp, Timestamp, getDoc, setDoc, limit,
            arrayUnion, arrayRemove
        };

        console.log("Firebase initialized successfully!");
    
