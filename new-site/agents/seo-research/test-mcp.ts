#!/usr/bin/env node
/**
 * Test MCP Integration
 *
 * Quick test to verify DataForSEO MCP tools are accessible
 */

import { query } from '@anthropic-ai/claude-agent-sdk';
import * as fs from 'fs/promises';
import * as path from 'path';

async function testDataForSEOMCP() {
  console.log('🧪 Testing DataForSEO MCP Integration\n');
  console.log('━'.repeat(60) + '\n');

  // Load MCP configuration
  const mcpConfigPath = path.join(process.cwd(), '.mcp.json');
  let mcpServers = null;

  try {
    const configContent = await fs.readFile(mcpConfigPath, 'utf-8');
    const config = JSON.parse(configContent);
    mcpServers = config.mcpServers;
    console.log('✅ MCP configuration loaded');
    console.log(`   Servers: ${Object.keys(mcpServers).join(', ')}\n`);
  } catch (error) {
    console.error('❌ Could not load .mcp.json');
    process.exit(1);
  }

  // Test 1: Simple keyword research
  console.log('📊 Test 1: Keyword Overview');
  console.log('   Keywords: ["board advisory", "executive coaching"]');
  console.log('   Location: United Kingdom\n');

  const testPrompt = `You have access to DataForSEO MCP tools. Please use the mcp__dataforseo__dataforseo_labs_google_keyword_overview tool to research these keywords:

Keywords: ["board advisory", "executive coaching"]
Location: United Kingdom (location_name parameter)
Language: en (language_code parameter)

Call the tool and then provide me with:
1. Search volume (monthly searches)
2. CPC (cost per click)
3. Competition level
4. Search intent

Format the results in a clear table.`;

  try {
    console.log('🔄 Querying Claude Agent SDK with MCP tools...\n');

    let fullResponse = '';
    let toolCalls = 0;

    const options = {
      mcpServers,
      systemPrompt: {
        type: 'custom' as const,
        prompt: 'You are a helpful SEO research assistant. You have access to DataForSEO MCP tools. When asked to research keywords, you should use the available MCP tools to get real data. Always call the appropriate tools rather than making up data.'
      }
    };

    for await (const message of query({ prompt: testPrompt, options })) {
      if (message.type === 'text') {
        fullResponse += message.text;
        process.stdout.write('.');
      } else if (message.type === 'tool_use') {
        toolCalls++;
        console.log(`\n\n🔧 Tool Call ${toolCalls}: ${message.name}`);
        if (message.input) {
          console.log(`   Input:`, JSON.stringify(message.input, null, 2));
        }
      } else if (message.type === 'tool_result') {
        console.log(`\n✅ Tool Result received`);
      }
    }

    console.log('\n\n' + '━'.repeat(60));
    console.log('📊 RESULTS');
    console.log('━'.repeat(60) + '\n');
    console.log(fullResponse);
    console.log('\n' + '━'.repeat(60));
    console.log(`\n🎯 Summary: ${toolCalls} MCP tool calls made`);
    console.log('✅ Test completed successfully!\n');

    // Save results
    const outputPath = path.join(process.cwd(), 'agents', 'seo-research', 'output', 'mcp-test-results.json');
    await fs.writeFile(outputPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      testPrompt,
      toolCalls,
      response: fullResponse
    }, null, 2));

    console.log(`📁 Results saved to: ${outputPath}`);

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
      console.error('   Stack:', error.stack);
    }
    process.exit(1);
  }
}

// Test 2: Check available MCP tools
async function listAvailableMCPTools() {
  console.log('\n\n' + '━'.repeat(60));
  console.log('🔧 Available MCP Tools');
  console.log('━'.repeat(60) + '\n');

  const prompt = 'What MCP tools do you have access to? List them with their descriptions.';

  try {
    const mcpConfigPath = path.join(process.cwd(), '.mcp.json');
    const configContent = await fs.readFile(mcpConfigPath, 'utf-8');
    const config = JSON.parse(configContent);

    let fullResponse = '';

    for await (const message of query({
      prompt,
      options: { mcpServers: config.mcpServers }
    })) {
      if (message.type === 'text') {
        fullResponse += message.text;
      }
    }

    console.log(fullResponse);
    console.log('\n' + '━'.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ Could not list MCP tools:', error);
  }
}

// Run tests
async function main() {
  try {
    await testDataForSEOMCP();
    await listAvailableMCPTools();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
