import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase/client";

interface Bank {
  code: string;
  name: string;
};

type BankResponse = Bank[];


export async function getBanks() : Promise<Bank[]> {
            const { data, error } = await supabase.functions.invoke<BankResponse>("get-banks")
                if(error){

                    console.log("Failed to load banks");
                   throw error;
                }
               if(!Array.isArray(data)){

                   throw new Error('Expectedarray of banks from edge function');
                }
                return data;
}