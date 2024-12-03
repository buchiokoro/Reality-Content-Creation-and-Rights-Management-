import { describe, it, expect, beforeEach } from 'vitest'

// Mock blockchain state
let arContent: { [key: number]: any } = {}
let contentData: { [key: number]: any } = {}
let lastContentId = 0

// Mock contract functions
const createArContent = (sender: string, title: string, description: string, contentHash: string) => {
  lastContentId++
  arContent[lastContentId] = sender
  contentData[lastContentId] = {
    creator: sender,
    title,
    description,
    content_hash: contentHash,
    created_at: Date.now()
  }
  return { success: true, value: lastContentId }
}

const transferArContent = (sender: string, contentId: number, recipient: string) => {
  if (arContent[contentId] !== sender) {
    return { success: false, error: 102 }
  }
  arContent[contentId] = recipient
  return { success: true }
}

const getArContentData = (contentId: number) => {
  return contentData[contentId] || null
}

const getArContentOwner = (contentId: number) => {
  return arContent[contentId] || null
}

describe('AR Content NFT', () => {
  beforeEach(() => {
    arContent = {}
    contentData = {}
    lastContentId = 0
  })
  
  it('allows creating AR content', () => {
    const wallet1 = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
    
    const result = createArContent(wallet1, 'My AR Content', 'Description', '0x1234567890abcdef')
    expect(result.success).toBe(true)
    expect(result.value).toBe(1)
    
    const contentData = getArContentData(1)
    expect(contentData).toBeTruthy()
    expect(contentData.title).toBe('My AR Content')
    expect(contentData.description).toBe('Description')
    expect(contentData.content_hash).toBe('0x1234567890abcdef')
    expect(contentData.creator).toBe(wallet1)
  })
  
  it('allows transferring AR content', () => {
    const wallet1 = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
    const wallet2 = 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC'
    
    createArContent(wallet1, 'My AR Content', 'Description', '0x1234567890abcdef')
    
    const result = transferArContent(wallet1, 1, wallet2)
    expect(result.success).toBe(true)
    
    const newOwner = getArContentOwner(1)
    expect(newOwner).toBe(wallet2)
  })
  
  it('prevents unauthorized transfers', () => {
    const wallet1 = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
    const wallet2 = 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC'
    
    createArContent(wallet1, 'My AR Content', 'Description', '0x1234567890abcdef')
    
    const result = transferArContent(wallet2, 1, wallet2)
    expect(result.success).toBe(false)
    expect(result.error).toBe(102)
  })
})

