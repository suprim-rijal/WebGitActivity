# Backend Concepts & Proxy Configuration

## 1. Virtual Fields in Mongoose (`toJSON` transform)

```javascript
jobSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});
```
