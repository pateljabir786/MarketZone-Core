const [spamCount, setSpamCount] = useState(0);
const [isBlocked, setIsBlocked] = useState(false);

const addProd = (e) => {
  e.preventDefault();
  
  if (isBlocked) {
    alert('સુરક્ષા ચેતવણી: શંકાસ્પદ પ્રવૃત્તિને કારણે તમને કામચલાઉ રીતે બ્લોક કરવામાં આવ્યા છે.');
    return;
  }

  const now = Date.now();
  // DDoS/Spam Prevention
  if (now - lastSubmitTime < 3000) {
    setSpamCount(prev => prev + 1);
    if (spamCount >= 3) {
      setIsBlocked(true);
      alert('સુરક્ષા ચેતવણી: વધુ પડતી શંકાસ્પદ વિનંતીઓ મળી છે, તેથી તમારી એક્સેસ કામચલાઉ રીતે બંધ કરવામાં આવી છે.');
    } else {
      alert('સુરક્ષા ચેતવણી: મહેરબાની કરીને થોડી રાહ જુઓ, રેટ લિમિટ સક્રિય છે.');
    }
    return;
  }
  // ... બાકીનો કોડ
};
