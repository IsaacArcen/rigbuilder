import React, { createContext, useContext, useState } from "react";
import { isAuthenticated, saveToken, logout as apiLogout } from "./api";