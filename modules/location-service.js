export const getCoords = () =>
  new Promise((resolve, reject) => {
    // Fallback: IP-based location (folosim ipapi.co gratuit)
    const fallbackToIp = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        resolve({
          latitude: data.latitude,
          longitude: data.longitude,
          source: 'ip',
          accuracy: 'city'
        });
      } catch (error) {
        reject(new Error('Nu am putut determina locația nici prin IP.'));
      }
    };

    // Verifică suport Geolocation API
    if (!navigator.geolocation) {
      console.warn('Geolocation API nu este suportat. Folosesc IP fallback.');
      return fallbackToIp();
    }

    // Încearcă geolocation nativ
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          source: 'gps',
          accuracy: 'precise'
        });
      },
      (error) => {
        console.warn('Geolocation eșuat:', error.message);
        fallbackToIp(); // Fallback dacă geolocation eșuează
      },
      {
        timeout: 5000,              // Max 5 secunde așteptare
        enableHighAccuracy: true,   // Precizie maximă
        maximumAge: 60000           // Acceptă o locație cached până la 1 minut
      }
    );
  });
