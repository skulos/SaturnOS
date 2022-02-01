# Yippee !! 🎉

OK cool. So we are coding together. As always, we're gonna complete the backend first. Once the backend is stable and we have an API defined, we can continue with the frontend. 

Here follows a rough step by step approach, and will be updated

1. Read up on double entry accounting

2. Implement an account (t-rekening) interface
```go
type Rand uint64

type Account interface {
    Debit(amount Rand)
    Credit(amount Rand)
}
```

3. Decide on how to categorize the 4 types of accounts
    - Assets
    - Capital/Liabilities
    - Income
    - Expenses

(Maybe another interface)

4. Create saldo/remainder algorithm

5. Implement financial reports as data structures