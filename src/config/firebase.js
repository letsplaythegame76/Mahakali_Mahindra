
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
        import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, Timestamp, getDoc, setDoc, limit, arrayUnion, arrayRemove, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
    
