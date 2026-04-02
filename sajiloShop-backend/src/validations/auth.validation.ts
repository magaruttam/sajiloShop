import * as z from "zod"; 

const userRole = z.enum(["user","vendor","admin"]);

//Register Schema
export const registerSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(5).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, 
        "Password must be at least 6 characters and include uppercase, lowercase, number, symbol"),
        role: userRole,
        shopName: z.string().optional()
}).refine((data)=>{
    //if role is vendor --> shop Name is required
    if (data.role === 'vendor' && !data.shopName){
        return false;
    }
    return true;
},{
message: "shopName is required when role is vendor",
path: ["shopName"]
}
)

//Login Sechema

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(5).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, 
        "Password must be at least 6 characters and include uppercase, lowercase, number, symbol"),
})

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;