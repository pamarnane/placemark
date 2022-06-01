import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
.keys({
  firstName: Joi.string().example("Joe").required(),
  lastName: Joi.string().example("Bloggs").required(),
  email: Joi.string().email().example("joe@bloggs.com").required(),
  password: Joi.string().example("secret").required(),
  scope: Joi.string().example("user"),
  _id: IdSpec,
  __v: Joi.number(),
  })
.label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserUpdateSpec = {
  firstName: Joi.string().example("Joe").required(),
  lastName: Joi.string().example("Bloggs").required(),
  email: Joi.string().email().example("joe@bloggs.com").required(),
  password: Joi.string().example("secret").required(),
};

export const PlacemarkSpec = Joi.object()
.keys({
  name: Joi.string().example("Lahinch").required(),
  category: Joi.string().example("Beach").required(),
  description: Joi.string().example("Beach in Co. Clare").required(),
  latitude: Joi.number().min(-90).max(90).example(52.9335).required(),
  longitude: Joi.number().min(-180).max(180).example(9.3441).required(),
  userID: Joi.string(),
  _id: IdSpec,
  __v: Joi.number(),
})
.label("PlacemarkDetails");

export const PlacemarkArray = Joi.array().items(PlacemarkSpec).label("PlacemarkArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    userID: Joi.object(),
  })
  .label("JwtAuth");
