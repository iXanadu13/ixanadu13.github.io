---
icon: pen-to-square
date: 2025-08-12
category:
  - C++
tag:
  - C++
---

# C++手撕智能指针

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
typedef pair<int, int> pii;
mt19937_64 rng(random_device{}());
template <class T>
class Arc {
private:
    int* cnt;
    T* ptr;
    mutex* lock;
    void inc() {
        lock->lock();
        ++*cnt;
        lock->unlock();
    }
    void release() {
        bool del = false;
        lock->lock();
        if (--*cnt == 0) {
            delete ptr;
            delete cnt;
            del = true;
        }
        lock->unlock();
        if (del) delete lock;
    }
public:
    Arc(T* ptr = nullptr):cnt(new int(1)), ptr(ptr), lock(new mutex) {}
    Arc(const Arc<T> &lhs):cnt(lhs.cnt), ptr(lhs.ptr), lock(lhs.lock) {
        inc();
    }
    Arc<T>& operator =(const Arc<T>& rhs) {
        if (ptr != rhs.ptr) {
            release();
            cnt = rhs.cnt;
            ptr = rhs.ptr;
            lock = rhs.lock;
            inc();
        }
        return *this;
    }
    T& operator*() {
        return *ptr;
    }
    T* operator->() {
        return ptr;
    }
    T* get() {
        return ptr;
    }
    ~Arc() {
        release();
    }
};
void solve() {
    auto ptr = Arc<vector<int>>(new vector<int>);
    ptr->push_back(1);
    ptr->push_back(2);
    ptr->push_back(3);
    for (auto &e : *ptr) {
        cout << e << ' ';
    }
}
int main()
{
#ifdef LOCAL
    freopen("data.in", "r", stdin);
    freopen("data.out", "w", stdout);
#endif
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    // int tt; cin >> tt;
    // while (tt--)
        solve();
    return 0;
}
```