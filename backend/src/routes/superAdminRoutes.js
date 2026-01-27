import { Router } from 'express';
import { allSchoolsList, allSchoolsListWithUuid, deleteSchool, getSuperAdminDashboardStats, schoolRegisterSuperAdmin, singleSchoolDetails, updateSchoolSuperAdmin } from '../controllers/superAdminController.js';
import Auth from '../middlewares/Auth.js';
import Permissions from '../middlewares/Permissions.js';
import { checkPermission } from '../middlewares/CheckPermission.js';
import { PERMISSIONS } from '../constants/Constants.js';
import Uploader from '../middlewares/Uploader.js';

const superAdminRouter = Router();

superAdminRouter.get('/schoolList',Auth.authenticate() , checkPermission(PERMISSIONS.READ_SCHOOL) , allSchoolsList);
superAdminRouter.get('/schoolListWithUuid' , allSchoolsListWithUuid);
superAdminRouter.get("/school-details/:schoolUuid" , singleSchoolDetails);
superAdminRouter.post('/add-school', Auth.authenticate() , checkPermission(PERMISSIONS.CREATE_SCHOOL) , Uploader.uploadMultipleFiles("public/profile_images"), schoolRegisterSuperAdmin);
superAdminRouter.put('/update-school/:school_uuid', Auth.authenticate() , checkPermission(PERMISSIONS.UPDATE_SCHOOL) , Uploader.uploadMultipleFiles("public/profile_images"), updateSchoolSuperAdmin);
superAdminRouter.delete('/delete-school/:school_uuid', Auth.authenticate() , checkPermission(PERMISSIONS.DELETE_SCHOOL) , deleteSchool )
superAdminRouter.get('/dashboard', Auth.authenticate() , getSuperAdminDashboardStats);
// superAdminRouter.get('/schoolList', allSchoolsList);
// superAdminRouter.post('/verify-otp', otpVerify);
// superAdminRouter.post('/signin', signIn);

export default superAdminRouter;
