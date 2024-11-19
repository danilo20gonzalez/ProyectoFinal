import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDUeylWgqZIUc_0Tp4aaPGoTVXAt4JQxss",
    authDomain: "imagenespajaros-febb2.firebaseapp.com",
    projectId: "imagenespajaros-febb2",
    storageBucket: "imagenespajaros-febb2.firebasestorage.app",
    messagingSenderId: "748568211847",
    appId: "1:748568211847:web:8166016042f429140e6322"
  };
// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa el servicio de Storage
const storage = getStorage(app);

export default storage;

