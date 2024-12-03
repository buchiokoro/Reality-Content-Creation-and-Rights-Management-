;; AR Content NFT Contract

(define-non-fungible-token ar-content uint)

(define-map content-data
  { content-id: uint }
  {
    creator: principal,
    title: (string-utf8 100),
    description: (string-utf8 500),
    content-hash: (buff 32),
    created-at: uint
  }
)

(define-data-var last-content-id uint u0)

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-unauthorized (err u102))

(define-public (create-ar-content (title (string-utf8 100)) (description (string-utf8 500)) (content-hash (buff 32)))
  (let
    ((new-id (+ (var-get last-content-id) u1)))
    (try! (nft-mint? ar-content new-id tx-sender))
    (map-set content-data
      { content-id: new-id }
      {
        creator: tx-sender,
        title: title,
        description: description,
        content-hash: content-hash,
        created-at: block-height
      }
    )
    (var-set last-content-id new-id)
    (ok new-id)
  )
)

(define-public (transfer-ar-content (content-id uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender (unwrap! (nft-get-owner? ar-content content-id) err-not-found)) err-unauthorized)
    (try! (nft-transfer? ar-content content-id tx-sender recipient))
    (ok true)
  )
)

(define-read-only (get-ar-content-data (content-id uint))
  (map-get? content-data { content-id: content-id })
)

(define-read-only (get-ar-content-owner (content-id uint))
  (nft-get-owner? ar-content content-id)
)

