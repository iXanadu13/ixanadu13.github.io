---
icon: pen-to-square
date: 2025-04-12
category:
  - C++
tag:
  - C++
---

# priority_queue重载运算符

```cpp
typedef pair<int, int> pii;
struct cmp {
    bool operator () (const pii& lhs, const pii& rhs) {
        return lhs.second > rhs.second;
    }
};

priority_queue<pii, vector<pii>, cmp> q;
```

或

```cpp
struct node {
    int x,y,cost;
    bool operator < (node rhs) const {
        return this->cost > rhs.cost;
    }
};

priority_queue<node> q;
```

注意下面的写法**并不能正确重载**：

```cpp
typedef pair<int, int> pii;
bool operator < (const pii& lhs, const pii& rhs) {
    return lhs.second < rhs.second;
}

priority_queue<pii> q;
```

