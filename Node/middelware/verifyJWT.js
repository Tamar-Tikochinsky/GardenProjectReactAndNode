
const jwt=require('jsonwebtoken')//יבוא הסיפריה
const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization//משתנה בו הוכנס הטוקן שהמשתמש הכניס אם בכלל
    //" "+ם לא קיים הידר|| שהוא לא מתחיל בירר
    if(!authHeader ?.startsWith ('Bearer ')){//בדיקה תקינות על הטוקן
        return res.status(401).json({message:"!!לא מורשה"})
    }
    const token=authHeader.split(' ')[1]//הפרדת הטוקן מהבירר והכנסתו לתוך משתנה
    jwt.verify(//אימות האם הטוקן יוצא וחולל על ידי הסיסמא שהתקבלה(הפרטית)
        token,//קבלת הטוקן מעורבב
        process.env.ACCESS_TOKEN_SECRET,//אימות הטוקן עם הסיסמא
        (err,decoded)=>{//decoded=מחזיר את האוביקט שאותו חוללתי לצוך הטוקןerr=שגיאה,הטוקן שהתקבל לא מתאים לסיסמא
            if(err)
            return res.status(403).json({message:"???????"})//מה שנשלח אם הטוקן לא מתאים
            req.user=decoded//בקיראה הבאה נוכל להשתמש בזה, מכיל את הטוקן
            next()//אם אין שגיאה נמשיך לקריאה הבאה
        }
    )
    }
module.exports=verifyJWT//ייצוא הפונקציה