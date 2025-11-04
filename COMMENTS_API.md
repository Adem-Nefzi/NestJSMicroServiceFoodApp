# 📝 Comments API Documentation

## Overview

The Comments API now supports **nested replies** with up to 3 levels of nesting. Users can comment on recipes and reply to other comments.

---

## 📡 API Endpoints

### 1. Create Comment or Reply

Create a new comment or reply to an existing comment.

**Endpoint:** `POST /comments`

**Request Body:**

```json
{
  "userId": "user123",
  "recipeId": "recipe456",
  "text": "This recipe is amazing!",
  "parentCommentId": null // null = top-level comment, or comment ID for reply
}
```

**Response:**

```json
{
  "id": "comment789",
  "userId": "user123",
  "recipeId": "recipe456",
  "text": "This recipe is amazing!",
  "parentCommentId": null,
  "createdAt": "2025-11-02T10:00:00.000Z",
  "updatedAt": "2025-11-02T10:00:00.000Z"
}
```

**Examples:**

```bash
# Create a top-level comment
curl -X POST http://localhost:3001/comments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "recipeId": "recipe456",
    "text": "This recipe is delicious!",
    "parentCommentId": null
  }'

# Create a reply to a comment
curl -X POST http://localhost:3001/comments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user789",
    "recipeId": "recipe456",
    "text": "I agree! Thanks for sharing",
    "parentCommentId": "comment789"
  }'
```

---

### 2. Get Comments by Recipe (Flat List)

Get all comments for a recipe as a flat list.

**Endpoint:** `GET /comments/recipe/:recipeId`

**Response:**

```json
[
  {
    "id": "comment1",
    "userId": "user123",
    "recipeId": "recipe456",
    "text": "Great recipe!",
    "parentCommentId": null,
    "createdAt": "2025-11-02T10:00:00.000Z",
    "updatedAt": "2025-11-02T10:00:00.000Z"
  },
  {
    "id": "comment2",
    "userId": "user789",
    "recipeId": "recipe456",
    "text": "Thanks!",
    "parentCommentId": "comment1",
    "createdAt": "2025-11-02T10:05:00.000Z",
    "updatedAt": "2025-11-02T10:05:00.000Z"
  }
]
```

**Example:**

```bash
curl http://localhost:3001/comments/recipe/recipe456
```

---

### 3. Get Comments with Nested Replies (Tree Structure) ⭐ NEW

Get all comments for a recipe organized in a tree structure with nested replies.

**Endpoint:** `GET /comments/recipe/:recipeId/tree`

**Response:**

```json
[
  {
    "id": "comment1",
    "userId": "user123",
    "recipeId": "recipe456",
    "text": "This recipe is amazing!",
    "parentCommentId": null,
    "createdAt": "2025-11-02T10:00:00.000Z",
    "updatedAt": "2025-11-02T10:00:00.000Z",
    "replies": [
      {
        "id": "comment2",
        "userId": "user789",
        "recipeId": "recipe456",
        "text": "I agree! Thanks for sharing",
        "parentCommentId": "comment1",
        "createdAt": "2025-11-02T10:05:00.000Z",
        "updatedAt": "2025-11-02T10:05:00.000Z",
        "replies": [
          {
            "id": "comment3",
            "userId": "user123",
            "recipeId": "recipe456",
            "text": "You're welcome!",
            "parentCommentId": "comment2",
            "createdAt": "2025-11-02T10:10:00.000Z",
            "updatedAt": "2025-11-02T10:10:00.000Z",
            "replies": []
          }
        ]
      }
    ]
  }
]
```

**Example:**

```bash
# This is the RECOMMENDED endpoint for displaying comments with replies
curl http://localhost:3001/comments/recipe/recipe456/tree
```

---

### 4. Get Replies for a Specific Comment

Get all direct replies to a specific comment.

**Endpoint:** `GET /comments/:commentId/replies`

**Response:**

```json
[
  {
    "id": "comment2",
    "userId": "user789",
    "recipeId": "recipe456",
    "text": "Great point!",
    "parentCommentId": "comment1",
    "createdAt": "2025-11-02T10:05:00.000Z",
    "updatedAt": "2025-11-02T10:05:00.000Z"
  }
]
```

**Example:**

```bash
curl http://localhost:3001/comments/comment1/replies
```

---

### 5. Get Comments by User

Get all comments created by a specific user.

**Endpoint:** `GET /comments/user/:userId`

**Response:**

```json
[
  {
    "id": "comment1",
    "userId": "user123",
    "recipeId": "recipe456",
    "text": "Great recipe!",
    "parentCommentId": null,
    "createdAt": "2025-11-02T10:00:00.000Z",
    "updatedAt": "2025-11-02T10:00:00.000Z"
  }
]
```

**Example:**

```bash
curl http://localhost:3001/comments/user/user123
```

---

### 6. Update Comment

Update the text of a comment. Only the comment owner can update.

**Endpoint:** `PUT /comments/:id?userId=user123`

**Query Parameters:**

- `userId` - The ID of the user making the request (for authorization)

**Request Body:**

```json
{
  "text": "Updated comment text"
}
```

**Response:**

```json
{
  "id": "comment1",
  "userId": "user123",
  "recipeId": "recipe456",
  "text": "Updated comment text",
  "parentCommentId": null,
  "createdAt": "2025-11-02T10:00:00.000Z",
  "updatedAt": "2025-11-02T10:15:00.000Z"
}
```

**Example:**

```bash
curl -X PUT "http://localhost:3001/comments/comment1?userId=user123" \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated comment text"}'
```

---

### 7. Delete Comment

Delete a comment. Only the comment owner can delete.

**Endpoint:** `DELETE /comments/:id?userId=user123&deleteReplies=true`

**Query Parameters:**

- `userId` - The ID of the user making the request (for authorization)
- `deleteReplies` - Optional. `true` (default) = delete comment and all its replies, `false` = delete only the comment

**Response:** `204 No Content`

**Examples:**

```bash
# Delete comment and all its replies (default)
curl -X DELETE "http://localhost:3001/comments/comment1?userId=user123"

# Delete only the comment, keep replies
curl -X DELETE "http://localhost:3001/comments/comment1?userId=user123&deleteReplies=false"
```

---

## 🎯 Features

### ✅ What's Implemented:

1. **Top-level Comments** - Users can comment on recipes
2. **Nested Replies** - Users can reply to comments (up to 3 levels deep)
3. **Tree Structure API** - Get comments organized with nested replies
4. **Flat List API** - Get comments as a flat list
5. **Reply-specific Queries** - Get replies for a specific comment
6. **User Authorization** - Only comment owners can edit/delete
7. **Cascade Delete** - Option to delete comment with all replies
8. **Nesting Depth Limit** - Maximum 3 levels to prevent infinite nesting

### 🔒 Authorization (Current):

- Uses `userId` query parameter
- Simple string comparison
- **Note:** This will be replaced with JWT authentication in Phase 2

---

## 📊 Data Structure

### Comment Model:

```typescript
{
  id: string; // Unique comment ID
  recipeId: string; // Recipe this comment belongs to
  userId: string; // User who created the comment
  text: string; // Comment text
  parentCommentId: string | null; // null = top-level, ID = reply to that comment
  createdAt: Date; // When created
  updatedAt: Date; // When last updated
}
```

### Tree Structure Example:

```
Comment 1 (parentCommentId: null)
├── Reply 1.1 (parentCommentId: Comment1)
│   └── Reply 1.1.1 (parentCommentId: Reply1.1)
│       └── Reply 1.1.1.1 ❌ (Too deep! Max 3 levels)
└── Reply 1.2 (parentCommentId: Comment1)

Comment 2 (parentCommentId: null)
└── Reply 2.1 (parentCommentId: Comment2)
```

---

## ⚠️ Validation Rules

1. **Parent Comment Must Exist**
   - Error: `404 Not Found` if parent comment doesn't exist

2. **Maximum Nesting Depth: 3 levels**
   - Error: `400 Bad Request` if trying to exceed depth

3. **Only Owner Can Edit/Delete**
   - Error: `403 Forbidden` if userId doesn't match

4. **Required Fields**
   - `userId`, `recipeId`, `text` are required
   - Error: `400 Bad Request` if missing

---

## 🚀 Frontend Integration Examples

### React Example - Display Comments with Replies:

```javascript
// Fetch comments with nested structure
const response = await fetch(
  'http://localhost:3001/comments/recipe/recipe456/tree',
);
const comments = await response.json();

// Recursive component to display comments
function CommentTree({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} style={{ marginLeft: '20px' }}>
          <div>
            <strong>{comment.userId}</strong>: {comment.text}
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <CommentTree comments={comment.replies} />
          )}
        </div>
      ))}
    </div>
  );
}
```

### Create a Comment:

```javascript
async function postComment(recipeId, userId, text, parentCommentId = null) {
  const response = await fetch('http://localhost:3001/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipeId,
      userId,
      text,
      parentCommentId,
    }),
  });
  return response.json();
}

// Usage:
// Top-level comment
await postComment('recipe456', 'user123', 'Great recipe!', null);

// Reply to a comment
await postComment('recipe456', 'user789', 'Thanks!', 'comment1');
```

---

## 🧪 Testing Scenarios

### Test 1: Create and Display Nested Comments

```bash
# 1. Create top-level comment
curl -X POST http://localhost:3001/comments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice",
    "recipeId": "pasta123",
    "text": "This pasta recipe is amazing!",
    "parentCommentId": null
  }'
# Response: { "id": "comment1", ... }

# 2. Reply to comment1
curl -X POST http://localhost:3001/comments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "bob",
    "recipeId": "pasta123",
    "text": "I agree! The sauce is perfect",
    "parentCommentId": "comment1"
  }'
# Response: { "id": "comment2", ... }

# 3. Reply to comment2
curl -X POST http://localhost:3001/comments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "alice",
    "recipeId": "pasta123",
    "text": "Thanks Bob!",
    "parentCommentId": "comment2"
  }'
# Response: { "id": "comment3", ... }

# 4. Get tree structure
curl http://localhost:3001/comments/recipe/pasta123/tree
# Should show comment1 with reply comment2, which has reply comment3
```

### Test 2: Maximum Depth Limit

```bash
# Try to create a 4th level reply (should fail)
curl -X POST http://localhost:3001/comments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "bob",
    "recipeId": "pasta123",
    "text": "This should fail",
    "parentCommentId": "comment3"
  }'
# Expected: 400 Bad Request - Maximum nesting depth exceeded
```

### Test 3: Delete with Replies

```bash
# Delete comment1 and all its replies
curl -X DELETE "http://localhost:3001/comments/comment1?userId=alice&deleteReplies=true"
# Should delete comment1, comment2, and comment3
```

---

## 🔄 Migration from Old System

If you had existing comments without `parentCommentId`:

- They will automatically have `parentCommentId: null`
- They will appear as top-level comments
- No data loss or migration needed!

---

## 📈 Next Steps (Phase 2)

When ready to add authentication:

1. Add JWT middleware to validate tokens
2. Extract `userId` from JWT instead of request body
3. Remove `userId` query parameter from endpoints
4. Add user details (username, avatar) to responses
5. Add notifications when someone replies to your comment

---

**🎉 Your comment system is now ready with full reply functionality!**
