import {getProfileByProfileId, putProfileController} from "./profile.controller";
import {Router} from "express";
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {check, checkSchema} from "express-validator";
import {isLoggedIn} from "../../utils/controllers/isLoggedIn.controller";
import {profileValidator} from "./profile.validator";

export const ProfileRoute: Router = Router();
ProfileRoute.route('/')
  .post(putProfileController);

ProfileRoute.route("/:profileId")
  .get(
    asyncValidatorController([
      check("profileId", "please provide a valid profileId").isUUID()
    ])
    , getProfileByProfileId
  )
  .put(isLoggedIn, asyncValidatorController(checkSchema(profileValidator)), putProfileController)
